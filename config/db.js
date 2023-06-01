const mongoose = require('mongoose');

const connectDB = async (MONGO_URI) => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            // These are to prevent deprecation warnings
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

module.exports = connectDB;
