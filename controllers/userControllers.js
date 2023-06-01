const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        res.status(200).json({ users, "success": true });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // check if user already exists
        const user = User.findOne({ username });

        if (user.username === username) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // hash password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        // create user

        const newUser = await User.create({

            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // create token

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.status(201).json({ newUser, token, "success": true });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // check if user exists
        const user = await User.findOne({ username }).select("+password");

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // create token

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.status(200).json({ user, token, "success": true });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = User.findById(id);

        // check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user, "success": true });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.logoutUser = async (req, res) => {
    try {
        res.cookie('jwt', 'loggedout', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true,
        });

        res.status(200).json({ message: 'User logged out', "success": true });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
