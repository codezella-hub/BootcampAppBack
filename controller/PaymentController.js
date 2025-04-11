require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const Payment = require('../models/Payment');

exports.createCheckoutSession = async (req, res) => {
  try {
    console.log("👉 Received checkout request:", req.body);

    const { items, totalAmount } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error('No valid items provided for checkout.');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => {
        if (!item.price || isNaN(item.price)) {
          throw new Error(`Invalid price for item: ${JSON.stringify(item)}`);
        }

        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.courseTitle || 'Untitled Course',
              images: [item.courseImage || 'https://placehold.co/600x400'],
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity || 1,
        };
      }),
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
    });

    console.log("✅ Stripe session created:", session.id);

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("❌ Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
};
