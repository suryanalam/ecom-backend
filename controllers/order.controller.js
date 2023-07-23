const {calcTotalPriceService, addOrderService, getAllOrderService, getOrderService, updateOrderService, deleteOrderService} = require('../services/order.service');

async function addOrderController(req,res){
    const { userId, products, shippingAddrId, paymentDetails } = req.body;

    const priceDetails = await calcTotalPriceService(products);
    let totalPrice = 0;

    if(priceDetails.success){
      totalPrice = priceDetails.data;
    }
    else{
        res.status(400).send({
            success: false,
            message: priceDetails.message
        })
    }

    const newOrderData = { userId, products, totalPrice, shippingAddrId, paymentDetails };

    const serviceData = await addOrderService(newOrderData);

    if(serviceData.success){
        res.status(200).send({
            success: true,
            message: serviceData.message,
            data: serviceData.data
        })
    }
    else{
        res.status(400).send({
            success: false,
            message: serviceData.message
        })
    }
}

async function getAllOrderController(req,res){
    const serviceData = await getAllOrderService();

    if(serviceData.success){
        res.status(200).send({
            success: true,
            message: serviceData.message,
            data: serviceData.data
        })
    }
    else{
        res.status(400).send({
            success: false,
            message: serviceData.message
        })
    }
}

async function getOrderController(req,res){
    const id = req.params.id;

    const serviceData = await getOrderService(id);

    if(serviceData.success){
        res.status(200).send({
            success: true,
            message: serviceData.message,
            data: serviceData.data
        })
    }
    else{
        res.status(400).send({
            success: false,
            message: serviceData.message
        })
    }
}

async function updateOrderController(req,res){
    const id = req.params.id;
    const { userId, products, shippingAddrId, paymentDetails } = req.body;

    const priceDetails = await calcTotalPriceService(products);
    let totalPrice = 0;

    if(priceDetails.success){
      totalPrice = priceDetails.data;
    }
    else{
        res.status(400).send({
            success: false,
            message: priceDetails.message
        })
    }

    const updatedOrderData = { userId, products, totalPrice, shippingAddrId,paymentDetails };

    const serviceData = await updateOrderService(id, updatedOrderData);

    if(serviceData.success){
        res.status(200).send({
            success: true,
            message: serviceData.message,
            data: serviceData.data
        })
    }
    else{
        res.status(400).send({
            success: false,
            message: serviceData.message
        })
    }
}

async function deleteOrderController(req,res){
    const id = req.params.id;

    const serviceData = await deleteOrderService(id);

    if(serviceData.success){
        res.status(200).send({
            success: true,
            message: serviceData.message,
            data: serviceData.data
        })
    }
    else{
        res.status(400).send({
            success: false,
            message: serviceData.message
        })
    }
}

module.exports = {addOrderController,getAllOrderController,getOrderController,updateOrderController, deleteOrderController}