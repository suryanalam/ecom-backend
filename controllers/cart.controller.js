const {addCartService, getCartService, updateCartService, deleteCartService} = require('../services/cart.service');

async function addCartController(req, res){
    const uid = req.params.id;
    const {pid, quantity} =  req.body;

    if(!pid || !quantity || !uid){
        res.status(400).send({
            success: false,
            message: 'uid, pid and quantity are required',
        });
    }

    if(uid != req.user._id){
        res.status(400).send({
            success: false,
            message: 'you are not allowed to add cart items of other users',
        });
    }

    const newCartData = {uid,pid,quantity};
    console.log('newCartData ', newCartData)
    
    let serviceData = await addCartService(newCartData);
    console.log('serviceData in controller ', serviceData);

    if(serviceData.success){
         res.status(200).send({
            success: true,
            message: serviceData.message,
            data: serviceData.data,
        });
    }else{
        res.status(500).send({
            success: false,
            message: serviceData.message,
        });
    }
}

async function getCartController(req,res){
    const uid = req.params.id;

    if(uid != req.user._id){
        res.status(400).send({
            success: false,
            message: 'you are not allowed to get cart items of other users',
        });
    }

    let serviceData = await getCartService(uid);
    console.log('serviceData in controller ', serviceData); 

    if(serviceData.success){
        res.status(200).send({
            success: true,
            message: serviceData.message,
            data: serviceData.data,
        });
    }else{
        res.status(500).send({
            success: false,
            message: serviceData.message,
        });
    }
}

async function updateCartController(req,res){

    const uid = req.params.id;
    const {pid,quantity} =  req.body;
    
    if(uid != req.user._id){
        res.status(400).send({
            success: false,
            message: 'you are not allowed to update cart items of other users',
        });
    }

    const updatedCartData ={uid, pid, quantity};
    console.log('updatedCartData ', updatedCartData)

    let serviceData = await updateCartService(uid, updatedCartData);
    console.log('serviceData in controller ', serviceData); 

    if(serviceData.success){
        res.status(200).send({
            success: true,
            message: serviceData.message,
            data: serviceData.data,
        });
    }else{
        res.status(500).send({
            success: false,
            message: serviceData.message,
        });
    }
}

async function deleteCartController(req,res){
    const id = req.params.id;

    let serviceData = await deleteCartService(id);
    console.log('serviceData in controller ', serviceData); 

    if(serviceData.success){
        res.status(200).send({
            success: true,
            message: serviceData.message,
            data: serviceData.data,
        });
    }else{
        res.status(500).send({
            success: false,
            message: serviceData.message,
        });
    }
}

module.exports = {addCartController, getCartController, updateCartController, deleteCartController};