const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name :{
        type: String,
        unique: true,
        required: true,
    },
    desc:{
        type: String,
        required: true,
    },
    specifications:[
        {
            type: String,
        }
    ],
    markedPrice :{
        type: Number,
        required: true,
    },
    discount:{
        type: Number,
        min: [1, 'Discount must be greater than or equal to one percent'],
    },
    sellingPrice:{
        type: Number,
    },
    rating:{
        type: Number,
        required: true,
    },
    categories:[
        {
            type: String,
            required: true,   
        }
    ],
    tags:[
        {
            type: String,
            required: true,
        }
    ],
    imageUrls:[
        {
            type: String,
        }
    ]
})

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;