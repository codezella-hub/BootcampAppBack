const Order = require("../models/Order");
const Course = require("../models/course");
const Payment = require("../models/Payment");

/**
 * Create a new order
 */
exports.createOrder = async (req, res) => {
    try {
        const { totalAmount, courseIds, paymentDetails } = req.body;

        // Validate course existence
        const courses = await Course.find({ _id: { $in: courseIds } });
        if (courses.length !== courseIds.length) {
            return res.status(400).json({ message: "One or more courses not found" });
        }

        // Handle Payment (Only if completed)
        let payment = null;
        if (paymentDetails && paymentDetails.paymentStatus === "Completed") {
            payment = new Payment(paymentDetails);
            await payment.save();
        }

        // Create Order
        const order = new Order({
            totalAmount,
            courses: courseIds,
            payment: payment ? payment._id : null,
            orderDate: new Date(),
        });

        await order.save();
        res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

/**
 * Get all orders
 */
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate({
                path: "courses",
                select: "title description price"
            })
            .populate({
                path: "payment",
                select: "amount paymentMethod paymentStatus transactionId"
            });

        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

/**
 * Get a single order by ID
 */
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate({
                path: "courses",
                select: "title description price"
            })
            .populate({
                path: "payment",
                select: "amount paymentMethod paymentStatus transactionId"
            });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

/**
 * Update an existing order
 */
exports.updateOrder = async (req, res) => {
    try {
        const { totalAmount, courseIds, paymentDetails } = req.body;

        // Validate course existence
        const courses = await Course.find({ _id: { $in: courseIds } });
        if (courses.length !== courseIds.length) {
            return res.status(400).json({ message: "One or more courses not found" });
        }

        // Handle Payment (Only if completed)
        let payment = null;
        if (paymentDetails && paymentDetails.paymentStatus === "Completed") {
            payment = new Payment(paymentDetails);
            await payment.save();
        }

        // Update Order
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                totalAmount,
                courses: courseIds,
                payment: payment ? payment._id : null,
            },
            { new: true }
        ).populate("courses").populate("payment");

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({ message: "Order updated successfully", updatedOrder });
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

/**
 * Delete an order
 */
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
