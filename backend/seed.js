import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './src/models/user.model.js';

dotenv.config();

const seedUsers = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI not set in .env');
    }

    await mongoose.connect(process.env.MONGODB_URI);

    // Optional: clear existing users
    await User.deleteMany({});

    const testUsers = [
      { fullName: 'User One', email: 'user1@test.com', password: 'password123', profilePic: '' },
      { fullName: 'User Two', email: 'user2@test.com', password: 'password123', profilePic: '' },
      { fullName: 'User Three', email: 'user3@test.com', password: 'password123', profilePic: '' },
      { fullName: 'User Four', email: 'user4@test.com', password: 'password123', profilePic: '' },
      { fullName: 'User Five', email: 'user5@test.com', password: 'password123', profilePic: '' },
      { fullName: 'User Six', email: 'user6@test.com', password: 'password123', profilePic: '' },
    ];

    for (const u of testUsers) {
      const salt = await bcrypt.genSalt(10);
      u.password = await bcrypt.hash(u.password, salt);
    }

    await User.insertMany(testUsers);
    console.log('✅ 6 test users added successfully');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();
