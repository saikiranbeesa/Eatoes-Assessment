const express = require('express');
const { body } = require('express-validator');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Validation middleware
const validateOrder = [
  body('items').isArray({ min: 1 }).withMessage('Items must be a non-empty array'),
  body('customerName').notEmpty().withMessage('Customer name is required')
];

// Routes
router.get('/', orderController.getOrders);
router.get('/analytics/top-sellers', orderController.getTopSellers);
router.get('/:id', orderController.getOrderById);
router.post('/', validateOrder, orderController.createOrder);
router.patch('/:id/status', orderController.updateOrderStatus);

module.exports = router;
