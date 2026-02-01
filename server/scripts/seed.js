require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');
const connectDB = require('../config/db');

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await MenuItem.deleteMany({});
    await Order.deleteMany({});

    // Sample menu items
    const menuItems = [
      {
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with parmesan and croutons',
        category: 'Appetizer',
        price: 8.99,
        ingredients: ['Lettuce', 'Parmesan', 'Croutons', 'Caesar dressing'],
        preparationTime: 5,
        isAvailable: true
      },
      {
        name: 'Spring Rolls',
        description: 'Crispy rolls filled with vegetables',
        category: 'Appetizer',
        price: 6.99,
        ingredients: ['Rice paper', 'Vegetables', 'Peanut sauce'],
        preparationTime: 8,
        isAvailable: true
      },
      {
        name: 'Grilled Salmon',
        description: 'Fresh salmon fillet with herbs',
        category: 'Main Course',
        price: 22.99,
        ingredients: ['Salmon', 'Herbs', 'Lemon', 'Olive oil'],
        preparationTime: 20,
        isAvailable: true
      },
      {
        name: 'Beef Steak',
        description: 'Premium ribeye steak with sauce',
        category: 'Main Course',
        price: 28.99,
        ingredients: ['Ribeye beef', 'Garlic', 'Rosemary', 'Butter'],
        preparationTime: 25,
        isAvailable: true
      },
      {
        name: 'Pasta Carbonara',
        description: 'Classic Italian pasta with creamy sauce',
        category: 'Main Course',
        price: 16.99,
        ingredients: ['Pasta', 'Eggs', 'Bacon', 'Parmesan'],
        preparationTime: 15,
        isAvailable: true
      },
      {
        name: 'Burger Deluxe',
        description: 'Double patty burger with special sauce',
        category: 'Main Course',
        price: 14.99,
        ingredients: ['Beef patties', 'Lettuce', 'Tomato', 'Cheese'],
        preparationTime: 12,
        isAvailable: true
      },
      {
        name: 'Chicken Tikka Masala',
        description: 'Tender chicken in creamy tomato sauce',
        category: 'Main Course',
        price: 18.99,
        ingredients: ['Chicken', 'Yogurt', 'Tomatoes', 'Spices'],
        preparationTime: 22,
        isAvailable: true
      },
      {
        name: 'Vegetable Stir Fry',
        description: 'Mixed vegetables with rice',
        category: 'Main Course',
        price: 12.99,
        ingredients: ['Broccoli', 'Bell peppers', 'Carrots', 'Soy sauce'],
        preparationTime: 10,
        isAvailable: true
      },
      {
        name: 'Chocolate Cake',
        description: 'Rich chocolate cake with frosting',
        category: 'Dessert',
        price: 7.99,
        ingredients: ['Chocolate', 'Flour', 'Eggs', 'Sugar'],
        preparationTime: 5,
        isAvailable: true
      },
      {
        name: 'Cheesecake',
        description: 'Creamy New York style cheesecake',
        category: 'Dessert',
        price: 8.99,
        ingredients: ['Cream cheese', 'Graham crackers', 'Sugar'],
        preparationTime: 5,
        isAvailable: true
      },
      {
        name: 'Ice Cream Sundae',
        description: 'Vanilla ice cream with toppings',
        category: 'Dessert',
        price: 6.99,
        ingredients: ['Ice cream', 'Whipped cream', 'Sprinkles'],
        preparationTime: 3,
        isAvailable: true
      },
      {
        name: 'Fresh Fruit Salad',
        description: 'Mixed seasonal fruits',
        category: 'Dessert',
        price: 5.99,
        ingredients: ['Mixed fruits', 'Honey'],
        preparationTime: 5,
        isAvailable: true
      },
      {
        name: 'Coffee',
        description: 'Fresh brewed espresso',
        category: 'Beverage',
        price: 3.99,
        ingredients: ['Coffee beans', 'Water'],
        preparationTime: 3,
        isAvailable: true
      },
      {
        name: 'Orange Juice',
        description: 'Freshly squeezed orange juice',
        category: 'Beverage',
        price: 4.99,
        ingredients: ['Oranges'],
        preparationTime: 2,
        isAvailable: true
      },
      {
        name: 'Iced Tea',
        description: 'Cold refreshing iced tea',
        category: 'Beverage',
        price: 2.99,
        ingredients: ['Tea', 'Ice', 'Lemon'],
        preparationTime: 2,
        isAvailable: true
      }
    ];

    const createdItems = await MenuItem.insertMany(menuItems);
    console.log(`✓ Created ${createdItems.length} menu items`);

    // Sample orders
    const orders = [
      {
        orderNumber: 'ORD-001',
        items: [
          { menuItem: createdItems[0]._id, quantity: 2, price: 8.99 },
          { menuItem: createdItems[2]._id, quantity: 1, price: 22.99 }
        ],
        totalAmount: 40.97,
        status: 'Delivered',
        customerName: 'John Doe',
        tableNumber: 5
      },
      {
        orderNumber: 'ORD-002',
        items: [
          { menuItem: createdItems[3]._id, quantity: 1, price: 28.99 }
        ],
        totalAmount: 28.99,
        status: 'Ready',
        customerName: 'Jane Smith',
        tableNumber: 3
      },
      {
        orderNumber: 'ORD-003',
        items: [
          { menuItem: createdItems[4]._id, quantity: 2, price: 16.99 },
          { menuItem: createdItems[8]._id, quantity: 2, price: 7.99 }
        ],
        totalAmount: 48.96,
        status: 'Preparing',
        customerName: 'Mike Johnson',
        tableNumber: 7
      },
      {
        orderNumber: 'ORD-004',
        items: [
          { menuItem: createdItems[1]._id, quantity: 3, price: 6.99 }
        ],
        totalAmount: 20.97,
        status: 'Pending',
        customerName: 'Sarah Williams',
        tableNumber: 2
      },
      {
        orderNumber: 'ORD-005',
        items: [
          { menuItem: createdItems[5]._id, quantity: 1, price: 14.99 },
          { menuItem: createdItems[12]._id, quantity: 2, price: 3.99 }
        ],
        totalAmount: 22.97,
        status: 'Delivered',
        customerName: 'Tom Brown',
        tableNumber: 1
      },
      {
        orderNumber: 'ORD-006',
        items: [
          { menuItem: createdItems[6]._id, quantity: 1, price: 18.99 }
        ],
        totalAmount: 18.99,
        status: 'Preparing',
        customerName: 'Emily Davis',
        tableNumber: 4
      },
      {
        orderNumber: 'ORD-007',
        items: [
          { menuItem: createdItems[2]._id, quantity: 2, price: 22.99 },
          { menuItem: createdItems[9]._id, quantity: 1, price: 8.99 }
        ],
        totalAmount: 54.97,
        status: 'Ready',
        customerName: 'Chris Martin',
        tableNumber: 8
      },
      {
        orderNumber: 'ORD-008',
        items: [
          { menuItem: createdItems[7]._id, quantity: 1, price: 12.99 }
        ],
        totalAmount: 12.99,
        status: 'Delivered',
        customerName: 'Lisa Anderson',
        tableNumber: 6
      },
      {
        orderNumber: 'ORD-009',
        items: [
          { menuItem: createdItems[3]._id, quantity: 1, price: 28.99 },
          { menuItem: createdItems[10]._id, quantity: 1, price: 6.99 }
        ],
        totalAmount: 35.98,
        status: 'Cancelled',
        customerName: 'Robert Taylor',
        tableNumber: 9
      },
      {
        orderNumber: 'ORD-010',
        items: [
          { menuItem: createdItems[4]._id, quantity: 1, price: 16.99 },
          { menuItem: createdItems[13]._id, quantity: 1, price: 4.99 }
        ],
        totalAmount: 21.98,
        status: 'Pending',
        customerName: 'Jessica White',
        tableNumber: 10
      }
    ];

    await Order.insertMany(orders);
    console.log(`✓ Created ${orders.length} sample orders`);

    console.log('\n✓ Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('✗ Seed error:', err.message);
    process.exit(1);
  }
};

seedDatabase();
