const {addCartController, getCartController, updateCartController, deleteCartController} = require('../controllers/cart.controller');
const express = require('express');

const cartRouter = express.Router();

cartRouter.post('/', addCartController);
//cartRouter.get('/', getAllCartController);
cartRouter.get('/:id', getCartController);
cartRouter.put('/:id', updateCartController);
cartRouter.delete('/:id', deleteCartController);

module.exports = cartRouter;