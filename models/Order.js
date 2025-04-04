const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    userid: { 
        type: Number, 
        required: true, 
        validate: {
            validator: function(value) {
                return /^\d{8}$/.test(value.toString()); 
            },
            message: 'CIN must be exactly 8 digits.'
        }
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    items: [{
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        price: {
            type: Number,
            required: true,
            min: 0
        }
    }],
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        default: null
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
    couponCode: {
        type: String,
        default: null
    },
    discount: {
        type: Number,
        default: 0,
        min: 0
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for subtotal calculation
OrderSchema.virtual('subtotal').get(function() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
});

module.exports = mongoose.model("Order", OrderSchema);