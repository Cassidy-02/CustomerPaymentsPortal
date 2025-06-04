const Payment = require('../models/payment');

exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll();
        res.json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.verifyPayment = async (req, res) => {
    const { paymentId } = req.params;

    try {
        const payment = await Payment.findByPk(paymentId);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // Here you would typically verify the payment with your payment gateway
        // For demonstration, we'll just mark it as verified
        payment.verified = true;
        await payment.save();

        res.json({ message: 'Payment verified successfully', payment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.submitPayment = async (req, res) => {
    const { amount, method, userId } = req.body;

    try {
        const newPayment = await Payment.create({
            amount,
            method,
            userId,
            verified: false // Initially set to false
        });

        res.status(201).json({ message: 'Payment submitted successfully', payment: newPayment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};