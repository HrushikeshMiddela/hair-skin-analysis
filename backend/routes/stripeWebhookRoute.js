const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const User = require('../models/User');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/', async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const credits = parseInt(session.metadata.credits);

    try {
      const user = await User.findById(userId);
      if (user) {
        user.credits = (user.credits || 0) + credits;
        await user.save();
      }
    } catch (err) {
      console.error('Failed to update user credits:', err);
    }
  }

  res.status(200).json({ received: true });
});

module.exports = router;
