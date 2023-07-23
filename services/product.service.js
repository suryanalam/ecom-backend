const ProductModel = require('../models/product.model');

async function addProductService(newProductData){
    const product = await ProductModel.create(newProductData);
    
    if(product){
        return {
            success: true,
            message: '✅Product added successfully',
            data: product
        }
    }else{
        return {
            success: false,
            message: '⚠️Product not added',
        }
    }

}

async function getAllProductService(){
    const products = await ProductModel.find();

    if(products.length){
        return {
            success: true,
            message: '✅All products found',
            data: products
        }
    }
    else{
        return res.status(500).send({
            success:false,
            message: '⚠️No products found',
        })
    }
}

async function getProductService(id){
    const product = await ProductModel.findById(id);
    if(product){
        return {
            success: true,
            message: '✅Product found',
            data : product
        }
    }
    else{
        return {
            success: true,
            message: '⚠️Product not found',
        }
    }
}

async function updateProductService(id, updatedProductData){
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedProductData, {new: true});

    if(updatedProduct){
        return {
            success: true,
            message: '✅Product updated successfully',
            data: updatedProduct
        }
    }
    else{
        return {
            success:false,
            message: '⚠️Product not updated',
        }
    }
}

async function deleteProductService(id){
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if(deletedProduct){
        return {
            success: true,
            message: '✅Product deleted successfully',
            data: deletedProduct
        }
    }
    else{
        return {
            success: false,
            message: '⚠️Product not deleted',
        }
    }
}

module.exports = {addProductService, getAllProductService, getProductService, updateProductService, deleteProductService};