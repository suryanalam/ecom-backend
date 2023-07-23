const CartModel = require('../models/cart.model');

async function addCartService(newCartData){
    const cart = await CartModel.findOne({uid: newCartData.uid});

    const productDetails = {
        pid: newCartData.pid,
        quantity: newCartData.quantity
    }

    if(!cart){
        const cartData = {
            uid: newCartData.uid, 
            products: [productDetails]  
        }; 

        const newCart = new CartModel.create(cartData);
        const savedCart = await newCart.save();

        if(savedCart){
            return {
                success: true,
                message: '✅Product added to cart successfully',
                data: savedCart
            }
        }else{
            return {
                success: false,
                message: '⚠️Product not added to cart',
            }
        }
    }

    const updateCart = await CartModel.findByIdAndUpdate(
        {_id: cart._id}, { $push: {products: productDetails} }, {new: true}
    );

    if(updateCart){
        return {
            success: true,
            message: '✅Product added to cart successfully',
            data: updateCart
        }
    }else{
        return {
            success: false,
            message: '⚠️Product not added to cart',
        }
    }
    
}

async function getAllCartService(){
    const carts = await CartModel.find().populate('uid','name email mobile').populate('pid','name price');

    if(carts.length){
        return {
            success: true,
            message: '✅All cart items',
            data: carts
        }
    }
    else{
        return res.status(500).send({
            success:false,
            message: '⚠️No cart items found',
        })
    }
}

async function getCartService(uid){
    const cart = await CartModel.findOne({uid}).populate('uid','name email mobile').populate('pid','name sellingPrice');
    if(cart){
        return {
            success: true,
            message: '✅Cart item found',
            data : cart
        }
    }
    else{
        return {
            success: true,
            message: '⚠️Cart item not found',
        }
    }
}

async function updateCartService(uid, updatedCartData){
    const cart = await CartModel.findOne(uid);

    if(!cart){
        return {
            success: false,
            message: '⚠️Cart item not found',
        }
    }
    console.log('cart: ', cart);

    const updatedCartDetails = cart.products.map((product) => {    
        if(product.pid == updatedCartData.pid){
            product.quantity = updatedCartData.quantity;
        }
    });

    if(!updatedCartDetails){
        return {
            success: false,
            message: '⚠️Cart item not updated',
        }
    }
    console.log('updatedCartDetails: ', updatedCartDetails);

    const updatedCart = await CartModel.findByIdAndUpdate(
        {_id: productDetails._id}, 
        { $set: {products: updatedCartDetails}},
        {new: true}
    );

    if(updatedCart){
        return {
            success: true,
            message: '✅Cart item updated successfully',
            data: updatedCart
        }
    }
    else{
        return {
            success:false,
            message: '⚠️Cart item not updated',
        }
    }
}

async function deleteCartService(id){
    const deletedCart = await CartModel.findByIdAndDelete(id);

    if(deletedCart){
        return {
            success: true,
            message: '✅Cart item deleted successfully',
            data: deletedCart
        }
    }
    else{
        return {
            success:false,
            message: '⚠️Cart item not deleted',
        }
    }
}

module.exports = {addCartService, getAllCartService, getCartService, updateCartService, deleteCartService};