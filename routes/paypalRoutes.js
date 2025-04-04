const express = require("express");
const paypal = require("../config/paypalConfig");
const router = express.Router();

// 1️⃣ Create Payment Route
router.post("/pay", (req, res) => {
    const { amount } = req.body;

    const paymentJson = {
        intent: "sale",
        payer: {
            payment_method: "paypal",
        },
        redirect_urls: {
            return_url: "http://localhost:3000/api/paypal/success",
            cancel_url: "http://localhost:3000/api/paypal/cancel",
        },
        transactions: [
            {
                amount: {
                    currency: "USD",
                    total: amount, // Pass the dynamic amount
                },
                description: "Payment for your order",
            },
        ],
    };

    paypal.payment.create(paymentJson, (error, payment) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: "Payment creation failed" });
        } else {
            const approvalUrl = payment.links.find(link => link.rel === "approval_url").href;
            res.json({ approvalUrl });
        }
    });
});

// 2️⃣ Success Route
router.get("/success", (req, res) => {
    const { paymentId, PayerID } = req.query;

    const executePaymentJson = {
        payer_id: PayerID,
    };

    paypal.payment.execute(paymentId, executePaymentJson, (error, payment) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: "Payment execution failed" });
        } else {
            res.send("Payment successful! Thank you for your purchase.");
        }
    });
});

// 3️⃣ Cancel Route
router.get("/cancel", (req, res) => {
    res.send("Payment was canceled.");
});

module.exports = router;
