const express = require('express');
const { body } = require('express-validator');
const menuController = require('../controllers/menuController');

const router = express.Router();

// Validation middleware
const validateMenuItem = [
  body('name').notEmpty().withMessage('Name is required'),
  body('category').isIn(['Appetizer', 'Main Course', 'Dessert', 'Beverage']).withMessage('Invalid category'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number')
];

// Routes
router.get('/', menuController.getMenuItems);
router.get('/search', menuController.searchMenuItems);
router.get('/:id', menuController.getMenuItemById);
router.post('/', validateMenuItem, menuController.createMenuItem);
router.put('/:id', menuController.updateMenuItem);
router.delete('/:id', menuController.deleteMenuItem);
router.patch('/:id/availability', menuController.toggleAvailability);

module.exports = router;
