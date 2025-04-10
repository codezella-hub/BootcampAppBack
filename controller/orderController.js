const Order = require("../models/order");

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user course");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single order
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user course");
        if (!order) return res.status(404).json({ error: "Order not found" });
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ error: "Order not found" });
        res.json({ message: "Order deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
