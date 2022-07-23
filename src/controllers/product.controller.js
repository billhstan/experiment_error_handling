
//product.controller.js
const productDataService = require('../services/product.service');
const {DbOption} = require('../config/dbservice.enums');
const chalk = require('chalk');

exports.processCreateProduct = async (req,res,next) => {
    console.log(chalk.magenta( '>>> processCreateProduct route handler method'));
    let { productName,brandId } = req.body;
    if((productName===undefined)||(brandId===undefined)){
        return res.status(400).json({statusCode:400,message:'Invalid parameters.'});
    }
    try{
    const results = await productDataService.createProduct({productName,brandId});
       return res.status(200).send({statusCode:200,message:'Completed.'})
    }catch(error) {
        return next(error); 
    }
}//End of processCreateProduct route handler


