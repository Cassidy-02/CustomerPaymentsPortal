const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validator = require('validator');

const router = express.Router();

const validateInput = (req, res, next) => {
    const {username, email, password, idnumber, accountnumber} = req.body;
    const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
    const idNumberRegex = /^[a-zA-Z0-9]{5,20}$/; // example pattern, adjust as needed
    const accountNumberRegex = /^[0-9]{8,20}$/; // example pattern, adjust as needed

    if (!usernameRegex.test(username) || !validator.isEmail(email) || password.length < 8 ||
        !idNumberRegex.test(idnumber) || !accountNumberRegex.test(accountnumber)) {
        return res.status(400).json({ message: 'Invalid input format'});
    }
    next();
};

//Register
router.post('/register', validateInput, async (req, res) => {
    const {username, email, password, idnumber, accountnumber} = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({username, email, password: hashed, idnumber, accountnumber});
        res.status(201).json({message: 'User registered'});
    } catch (err) {
        res.status(400).json({message: 'User already exists or error occurred'});
    }
});

//Login
router.post('/login', async (req, res) => {
    const {username,password} = req.body;
    const user = await User.findOne({where: {username}});

    if (!user) return res.status(400).json({ message: 'User not found'});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials'});

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: '1h'});
    res.json({token});
});

module.exports = router;