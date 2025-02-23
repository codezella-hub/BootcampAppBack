const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    orderDate: {
        type: Date,
        default: Date.now,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
    
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        required: false, // Only stored when payment is successful
    },
});

module.exports = mongoose.model("Order", OrderSchema);
