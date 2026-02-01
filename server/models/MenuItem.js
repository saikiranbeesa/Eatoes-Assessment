const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    index: true
  },
  description: String,
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price']
  },
  ingredients: [String],
  isAvailable: {
    type: Boolean,
    default: true
  },
  preparationTime: Number,
  imageUrl: String
}, { timestamps: true });

// Create text index for search functionality
menuItemSchema.index({ name: 'text', ingredients: 'text' });

module.exports = mongoose.model('MenuItem', menuItemSchema);
