const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
    userId: { 
        type: Number, 
        required: true, 
        validate: {
            validator: function(value) {
                return /^\d{8}$/.test(value.toString()); 
            },
            message: 'CIN must be exactly 8 digits.'
        }
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Completed", "Failed"],
        default: "Pending",
    },
    transactionId: {
        type: String,
        required: true,
    },
    paymentDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Payment", PaymentSchema);