const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { processPayment, getPaymentStatus } = require('../controllers/paymentController');
// Middleware to check authentication

router.use(auth);
router.get('/', getPaymentStatus); // Route to get payment status
router.post('/verify/:id', verifyPayment); // Route to verify payment by ID
router.post('/submit', processPayment); // Route to submit a new payment
module.exports = router;
// This file sets up the payment routes for the application.