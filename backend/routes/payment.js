const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
router.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount } = req.body;

        // Create a PaymentIntent with the amount to charge
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // convert to smallest currency unit (e.g., cents)
            currency: 'usd',
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;