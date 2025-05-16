const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const plans = {
  starter: { price: 500, credits: 5 },  // $5
  pro: { price: 1000, credits: 15 },    // $10
  elite: { price: 2000, credits: 40 },  // $20
};

exports.createCheckoutSession = async (req, res) => {
  const { planId } = req.body;
  const userId = req.user.id; // from JWT middleware

  const plan = plans[planId];
  if (!plan) {
    return res.status(400).json({ error: 'Invalid plan' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${plan.credits} Credits Plan`
            },
            unit_amount: plan.price,
          },
          quantity: 1,
        },
      ],
       success_url: "http://localhost:5173/dashboard?success=true",
      cancel_url: "http://localhost:5173/dashboard?canceled=true",
      metadata: {
        userId: userId,
        credits: plan.credits.toString(),
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: 'Something went wrong creating session' });
  }
};
