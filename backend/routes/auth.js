const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Import the middleware
const Expense = require('../models/ExpenseModel');

// Get User-Specific Data (Expenses, for example)
router.get('/user/:userId/data', authMiddleware, async (req, res) => {
    const userId = req.params.userId;
    try {
        if (req.user !== userId) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        const expenses = await Expense.find({ userId });
        res.json({ expenses });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Signup Route
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({
            success: true,
            message: 'User created successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});


// Signin Route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            success: true,
            token,
            userId: user._id  // Include userId in the response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});


module.exports = router;
