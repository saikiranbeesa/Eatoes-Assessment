const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const { validationResult } = require('express-validator');

// Generate order number
const generateOrderNumber = () => {
  return 'ORD-' + Date.now();
};

// Get all orders with pagination and filtering
exports.getOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    let filter = {};

    if (status) filter.status = status;

    const skip = (page - 1) * limit;
    const orders = await Order.find(filter)
      .populate('items.menuItem', 'name price')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: orders
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get single order
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.menuItem');
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Create order
exports.createOrder = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { items, customerName, tableNumber } = req.body;

    // Calculate total amount
    let totalAmount = 0;
    for (let item of items) {
      totalAmount += item.price * item.quantity;
    }

    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      items,
      totalAmount,
      customerName,
      tableNumber
    });

    await order.populate('items.menuItem', 'name price');

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    let order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get top selling items (aggregation)
exports.getTopSellers = async (req, res) => {
  try {
    const topSellers = await Order.aggregate([
      { $match: { status: { $ne: 'Cancelled' } } },
      { $unwind: '$items' },
      { $group: {
          _id: '$items.menuItem',
          totalQty: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
      }},
      { $lookup: {
          from: 'menuitems',
          localField: '_id',
          foreignField: '_id',
          as: 'details'
      }},
      { $sort: { totalQty: -1 } },
      { $limit: 5 }
    ]);

    res.status(200).json({
      success: true,
      data: topSellers
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
