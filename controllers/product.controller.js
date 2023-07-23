const {addProductService, getAllProductService, getProductService, updateProductService, deleteProductService} = require('../services/product.service');

const fs = require('fs');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dn2bdlrog', 
    api_key: '742438941554653', 
    api_secret: 'nceiPStb9JFFrZtLZDISdaA3yyU' 
});

async function addProductController(req, res){
    const { name, desc, markedPrice, discount, rating } =  req.body;
    let { categories, tags, specifications } = req.body;
   
    if(!name || !desc || !markedPrice || !rating || !categories || !tags || !specifications){
        return res.status(400).send({
            success: false,
            message: 'Missing required fields',
        });
    } 

    //convert categories, tags, specifications from string to array
    categories = JSON.parse(categories);
    tags = JSON.parse(tags);
    specifications = JSON.parse(specifications);

    const newProductData = { name, desc, markedPrice, rating, categories, tags, specifications};

    //add sellingPrice to newProductData if discount is provided
    if(discount){
        newProductData.discount = discount;
        const sellingPrice = markedPrice - (markedPrice * discount) / 100;
        newProductData.sellingPrice = sellingPrice;
    }else{
        newProductData.sellingPrice = markedPrice;
    }
    
    //add imageUrls to newProductData
    const images = req.files;

    if(!images){
        return res.status(400).send({
            success: false,
            message: 'add atleast one image of the product',
        });
    }

    console.log('images from req.files', images);

    const imageUrls = await Promise.all(
        images.map(async (image) => {
            const res = await cloudinary.uploader.upload(image.path);
            return res.secure_url;
        })
    );

    if(!imageUrls){
        return res.status(500).send({
            success: false,
            message: 'Error while generating image URLs',
        });
    }

    console.log('imageUrls from cloudinary', imageUrls)

    //delete images from uploads folder:
    //first read the files in uploads folder then unlink/delete the each file
    fs.readdirSync('./uploads').forEach((file)=>{
        fs.unlink(`./uploads/${file}`, (err)=>{
            if(err) throw err;
            console.log(`deleted ${file} successfully`);
        })
    });

    newProductData.imageUrls = imageUrls;
    
    let serviceData = await addProductService(newProductData);
    console.log('serviceData in controller ', serviceData);

    if(serviceData.success){
         return res.status(200).send({
            success: true,
            message: serviceData.message,
            data: serviceData.data,
        });
    }else{
        return res.status(500).send({
            success: false,
            message: serviceData.message,
        });
    }
}

async function getAllProductController(req, res){

    let serviceData = await getAllProductService();
    console.log('serviceData in controller ', serviceData); 

    if(serviceData.success){
        return res.status(200).send({
            success: true,
            message: serviceData.message,
            data: serviceData.data,
        });
    }else{
        return res.status(500).send({
            success: false,
            message: serviceData.message,
        });
    }
}

async function getProductController(req,res){
    const id = req.params.id;

    let serviceData = await getProductService(id);
    console.log('serviceData in controller ', serviceData); 

    if(serviceData.success){
        return res.status(200).send({
            success: true,
            message: serviceData.message,
            data: serviceData.data,
        });
    }else{
        return res.status(500).send({
            success: false,
            message: serviceData.message,
        });
    }
}

async function updateProductController(req,res){
    const id = req.params.id;
    const images = req.files;

    const { name, desc, markedPrice, discount, rating, specifications, categories, tags } =  req.body;

    console.log('req.body in updateProductController', req.body);

    let updatedProductData = {};

    if(name) updatedProductData.name = name;
    if(desc) updatedProductData.desc = desc;
    if(markedPrice) updatedProductData.markedPrice = markedPrice;
    if(rating) updatedProductData.rating = rating;
    if(specifications) updatedProductData.specifications = JSON.parse(specifications);
    if(categories) updatedProductData.categories = JSON.parse(categories);
    if(tags) updatedProductData.tags = JSON.parse(tags);


    if(discount){
        updatedProductData.discount = discount;
        const sellingPrice = markedPrice - (markedPrice * discount) / 100;
        updatedProductData.sellingPrice = sellingPrice;
    }

    if(images){
        const imageUrls = await Promise.all(
            images.map(async (image) => {
                const res = await cloudinary.uploader.upload(image.path);
                return res.secure_url;
            })
        );

        if(!imageUrls){
            return res.status(500).send({
                success: false,
                message: 'Error while generating image URLs',
            });
        }

        updatedProductData.imageUrls = imageUrls;       
    }

    console.log('updatedProductData before service', updatedProductData);

    let serviceData = await updateProductService(id, updatedProductData);
    console.log('serviceData in controller ', serviceData); 

    if(serviceData.success){
        return res.status(200).send({
            success: true,
            message: serviceData.message,
            data: serviceData.data,
        });
    }
    else{
        return res.status(500).send({
            success: false,
            message: serviceData.message,
        });
    }
}

async function deleteProductController(req,res){
    const id = req.params.id;

    let serviceData = await deleteProductService(id);
    console.log('serviceData in controller ', serviceData); 

    if(serviceData.success){
        return res.status(200).send({
            success: true,
            message: serviceData.message,
            data: serviceData.data,
        });
    }else{
        return res.status(500).send({
            success: false,
            message: serviceData.message,
        });
    }
}

module.exports = {addProductController, getAllProductController, getProductController, updateProductController, deleteProductController};