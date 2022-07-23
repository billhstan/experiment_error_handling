
//test.controller.js
const bcrypt = require('bcryptjs');
const authDataService = require('../services/auth.service');
const testDataService = require('../services/test.service');
const {DbOption} = require('../config/dbservice.enums');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const Cryptr = require('cryptr');

exports.processCheckRefreshToken = async (req,res) => {
    console.log('----- processCheckRefreshToken controller method executing ----- ')
    //This block of code will not work if there is missing userId in the req.body (verifyToken logic failed to get the data from accessToken cookie)
    userId = req.params.userId;
    const results = await testDataService.findRefreshToken({userId,actionType:DbOption.FIND_ALL_TIED_TO_ONE_USER_ID});
    if  (results.length>=1){
                 return res.status(200).send({status:200,message:'',data:results}); //return raw mysql results
            } else {
        console.log('----- processCheckRefreshToken controller method (else block for results.length>=1) ----- ')
        return res.status(200).send({status:500,message:'Empty results',data:[]});
    }
}
