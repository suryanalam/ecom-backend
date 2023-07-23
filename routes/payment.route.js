const { createPaymentOrderController, verifyPaymentController } = require('../controllers/payment.controller');

const express = require('express');
const Authorize = require('../middlewares/Authorize.middleware');

const paymentRouter = express.Router();

paymentRouter.post('/create', Authorize, createPaymentOrderController);

paymentRouter.post('/verify', verifyPaymentController)

module.exports = paymentRouter;