const { createPaymentOrderService } = require("../services/payment.service");

require("dotenv").config();
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function createPaymentOrderController(req,res){
    try{
        const {amount, receiptNo} = req.body;
        const options = {
            amount: amount * 100, //converting rupee to paise
            currency: "INR",
            receipt: receiptNo,
        }
        const order = await razorpay.orders.create(options);
        console.log(order);

        const orderAmount = order.amount / 100;

        const serviceData = await createPaymentOrderService(req.userId, order.order_id, receiptNo, amount);

        if(serviceData.success){
            return res.status(200).send({
                success: true,
                message: "Payment Order created successfully",
                order_id: order.order_id,
                amount: order.amount,
                receipt_no: order.receipt,
            })
        }else{
            return res.status(500).send({
                success: false,
                message: serviceData.message,
            });
        }

    }catch(err){
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Error while creating payment order",
        })
    }
}

async function verifyPaymentController(req,res){

}

module.exports = {createPaymentOrderController, verifyPaymentController}