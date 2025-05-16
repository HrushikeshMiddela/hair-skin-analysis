const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const analysisRoutes = require('./routes/analysis');
const stripeRoutes = require('./routes/stripeRoutes');
const stripeWebhook = require('./routes/stripeWebhookRoute'); // 👈 Create this

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Stripe webhook needs raw body FIRST
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }), stripeWebhook);

// Then JSON parser for all other routes
app.use(express.json());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/analysis', analysisRoutes);
app.use('/api/stripe', stripeRoutes); // 👈 this is a router, not a controller

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected");
  app.listen(5000, () => console.log("Server started on port 5000"));
})
.catch(err => console.log(err));
