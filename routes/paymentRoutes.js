const express = require('express');
const router = express.Router();
const PaymentController = require('../controller/PaymentController');

router.post('/create-checkout-session', PaymentController.createCheckoutSession);

module.exports = router;
