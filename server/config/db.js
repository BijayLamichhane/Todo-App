import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(`${process.env.MONGODB_URI}/todo-app`);
    console.log('✅ Database Connected');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

export default connectDB;