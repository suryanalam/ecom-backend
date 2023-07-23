const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    uid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products:[
        {
            pid:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },

            quantity:{
                type: Number,
                min: [1, 'Quantity can not be less than 1'],
            }

        }   
    ],

});

const CartModel = mongoose.model('Cart', cartSchema);
module.exports = CartModel;