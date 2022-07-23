
//brand.controller.js
const E = require('../errors');
const brandDataService = require('../services/brand.service');
const {DbOption} = require('../config/dbservice.enums');
const chalk = require('chalk');

exports.processCreateBrand = async (req,res,next) => {
    console.log(chalk.magenta( '>>> processCreateBrand route handler method'));
    let { brandName } = req.body;
    if((brandName===undefined)){
       next(new E.ParameterInputError());
    }
    try{
    const results = await brandDataService.createBrand({brandName});
       return res.status(200).send({statusCode:200,message:'Completed.'})
    }catch(error) {
        return next(error); 
    }
}//End of processCreateBrand  route handler
exports.processDeleteBrand = async (req,res,next) => {
    console.log(chalk.magenta( '>>> processDeleteBrand route handler method'));
    let { brandId } = req.params;
    if((brandId===undefined)){
       next(new E.ParameterInputError());
    }
    try{
    const results = await brandDataService.deleteBrand({brandId});
       return res.status(200).send({statusCode:200,message:'Completed.'})
    }catch(error) {
        return next(error); 
    }
}//End of processDeleteBrand  route handler

