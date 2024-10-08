import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Connect to MongoDB (replace <DB_URI> with your actual MongoDB URI)
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully');
        
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

// Export the connection function
export default connectDB;