const express = require('express');
const orderRouter = express.Router();

const {addOrderController, getAllOrderController, getOrderController, updateOrderController, deleteOrderController} = require('../controllers/order.controller');

orderRouter.post('/', addOrderController);
orderRouter.get('/', getAllOrderController);
orderRouter.get('/:id', getOrderController);
orderRouter.put('/:id', updateOrderController);
orderRouter.delete('/:id', deleteOrderController);

module.exports = orderRouter;