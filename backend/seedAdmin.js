const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User'); // path to your User model

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = new User({
      email: 'admin@example.com',
      password: hashedPassword
    });

    await admin.save();
    console.log('✅ Admin user created');
  } catch (err) {
    console.error('❌ Error creating admin user:', err);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin();
