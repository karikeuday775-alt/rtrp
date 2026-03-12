const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Property = require('../models/Property');
const Favorite = require('../models/Favorite');
const sampleProperties = require('../data/sampleProperties');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/luxe-estate');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Property.deleteMany({});
    await Favorite.deleteMany({});
    console.log('Cleared existing data');

    // Create sample users
    const hashedPassword = await bcrypt.hash('password123', 12);
    
    const users = [
      {
        name: 'John Buyer',
        email: 'buyer@example.com',
        password: hashedPassword,
        phone: '+91 9876543200',
        role: 'buyer'
      },
      {
        name: 'Jane Seller',
        email: 'seller@example.com',
        password: hashedPassword,
        phone: '+91 9876543201',
        role: 'seller'
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        phone: '+91 9876543202',
        role: 'admin'
      },
      {
        name: 'Property Owner 1',
        email: 'owner1@example.com',
        password: hashedPassword,
        phone: '+91 9876543203',
        role: 'seller'
      },
      {
        name: 'Property Owner 2',
        email: 'owner2@example.com',
        password: hashedPassword,
        phone: '+91 9876543204',
        role: 'seller'
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log(`Created ${createdUsers.length} users`);

    // Get seller users for properties
    const sellers = createdUsers.filter(user => user.role === 'seller');

    // Create sample properties
    const propertiesWithSellers = sampleProperties.map((property, index) => ({
      ...property,
      seller: sellers[index % sellers.length]._id
    }));

    const createdProperties = await Property.insertMany(propertiesWithSellers);
    console.log(`Created ${createdProperties.length} properties`);

    console.log('\n=== Sample Login Credentials ===');
    console.log('Buyer: buyer@example.com / password123');
    console.log('Seller: seller@example.com / password123');
    console.log('Admin: admin@example.com / password123');
    console.log('================================\n');

    console.log('Data seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();