const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // ✅ move secret key to .env
const OrdersModel = require('../models/Orders');
const Payment = require('../models/Payment');

exports.createCheckoutSession = async (req, res) => {
  try {
    const { items, amount, userid, couponCode = null, discount = 0 } = req.body;

    console.log("📦 Received items from frontend:", items);

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "No items to process." });
    }

    // Create the order before Stripe checkout
    const newOrder = new OrdersModel({
      userid,
      couponCode,
      discount,
      totalAmount: amount,
      items: items.map(item => ({
        courseId: item.courseId,
        quantity: item.quantity,
        price: item.price
      })),
      status: 'pending',
      orderDate: new Date()
    });

    await newOrder.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      metadata: {
        orderId: newOrder._id.toString()
      }
    });

    res.json({ id: session.id });

  } catch (error) {
    console.error('❌ Error creating Stripe session:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata.orderId;

    try {
      const payment = new Payment({
        amount: session.amount_total / 100,
        paymentMethod: 'stripe',
        paymentStatus: 'Completed',
        transactionId: session.payment_intent,
        paymentDate: new Date()
      });
      await payment.save();

      const order = await OrdersModel.findById(orderId);
      if (order) {
        order.payment = payment._id;
        order.status = 'completed';
        await order.save();
      }

      res.json({ received: true });
    } catch (error) {
      console.error('❌ Error saving payment or updating order:', error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.json({ received: true });
  }
};
