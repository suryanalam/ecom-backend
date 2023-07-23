const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    paymentOrderId: {
        type: String,
        required: true
    },
    receiptNo:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum: ['success', 'failure', 'pending'],
        default: 'pending'  
    }
});

const PaymentModel = mongoose.model('Payment', paymentSchema);
module.exports = PaymentModel;