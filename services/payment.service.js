const paymentModel = require('../models/payment.model');

async function createPaymentOrderService(userId, paymentOrderId, receiptNo, amount) {
    const paymentOrderData = {
        user: userId,
        paymentOrderId,
        receiptNo,
        amount,
    }
    const paymentOrder = new paymentModel.create(paymentOrderData);

    if(paymentOrder){
        return {
            success: true,
            message: "Payment Order created successfully",
            data: paymentOrder
        }
    }else{
        return {
            success: false,
            message: "payment order creation failed",
        }
    }
}

module.exports = {
    createPaymentOrderService,
}