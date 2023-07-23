const OrderModel = require('../models/order.model');
const ProductModel = require('../models/product.model');

async function calcTotalPriceService(products){
    const prices = await Promise.all(
            products.map(async (currentProduct) => {
            const productDetails = await ProductModel.findById(currentProduct.productId);
            let productPrice = productDetails.price;
            return  productPrice * currentProduct.productQty;
        })
    )

    const finalPrice = await prices.reduce((sum, price) => sum + price, 0);
    
    if(finalPrice){
        return {
            success: true,
            message: '✅Total price calculated',
            data: finalPrice
        }
    }
    else{
        return {
            success: false,
            message: '⚠️Total price not calculated',
        }
    }
}

async function addOrderService(newOrderData){
    const order = await OrderModel.create(newOrderData);

    if(order){
        return {
            success: true,
            message: '✅Order added successfully',
            data: order
        }
    }
    else{
        return {
            success: false,
            message: '⚠️Order not added',
        }
    }
}

async function getAllOrderService(){
    const orders = await OrderModel.find().populate('userId','name email').populate('products.productId','name price').populate('shippingAddrId');

    if(orders.length){
        return {
            success: true,
            message: '✅All orders found',
            data: orders
        }
    }
    else{
        return {
            success: false,
            message: '⚠️No orders found',
        }
    }
}

async function getOrderService(id){
    const order = await OrderModel.findById(id);

    if(order){
        return {
            success: true,
            message: '✅Order found',
            data: order
        }
    }
    else{
        return {
            success: false,
            message: '⚠️Order not found',
        }
    }
}

async function updateOrderService(id, updatedOrderData){
    const updatedOrder = await OrderModel.findByIdAndUpdate(id,updatedOrderData, {new: true});

    if(updatedOrder){
        return {
            success: true,
            message: '✅Order updated successfully',
            data: updatedOrder
        }
    }
    else{
        return {
            success: false,
            message: '⚠️Order not updated',
        }
    }
}

async function deleteOrderService(id){
    const deletedOrder = await OrderModel.findByIdAndDelete(id);

    if(deletedOrder){
        return {
            success: true,
            message: '✅Order deleted successfully',
            data: deletedOrder
        }
    }
    else{
        return {
            success: false,
            message: '⚠️Order not deleted',
        }
    }
}

module.exports = {calcTotalPriceService,addOrderService,getAllOrderService,getOrderService,updateOrderService, deleteOrderService}