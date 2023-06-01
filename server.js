const express = require('express');
const connectDB = require('./config/db');
// const problemRoutes = require('./routes/problemRoutes');
const bodyParser = require('body-parser');

const app = express();

require('dotenv').config({ path: '.env' });

app.get('/', (req, res) => {
    res.send('Hello world');
});

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/api/problems', require('./routes/problemRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

connectDB(process.env.MONGO_URI); // Connect to MongoDB

app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port 5000');
});