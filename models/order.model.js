const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            productQty: {
                type: Number,
                min: [1, 'Must be at least 6, got {VALUE}']
            }
        }
    ],
    totalPrice: {
        type: Number,
    },
    shippingAddrId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    paymentDetails: {
        status: {
            type: String, 
            enum: { 
                values: ['Pending', 'Failed', 'Success'], 
                message: '{VALUE} is not supported' 
            }
        },
        mode: {
            type: String, 
            enum: { 
                values: ['COD', 'Card', 'UPI'], 
                message: '{VALUE} is not supported'
            }
        },
        paymentId: {
            type: String
        },
    },
},{timestamps: true})

const OrderModel = mongoose.model('Order', orderSchema);
module.exports = OrderModel;