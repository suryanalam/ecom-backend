const {addProductController, getAllProductController, getProductController, updateProductController, deleteProductController} = require('../controllers/product.controller');

const Authorize = require('../middlewares/Authorize.middleware');

const express = require('express');
const multer = require('multer');
const upload = multer({dest: './uploads/'});

const productRouter = express.Router();

productRouter.post('/',Authorize(['admin']), upload.array('images',5), addProductController); // only admin can access this route  (add product)
productRouter.get('/', getAllProductController);
productRouter.get('/:id', getProductController);
productRouter.put('/:id', Authorize(['admin']), upload.array('images',5), updateProductController); // only admin can access this route (update product)
productRouter.delete('/:id',Authorize(['admin']), deleteProductController); // only admin can access this route (delete product)

module.exports = productRouter;