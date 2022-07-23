//product.service.js
const mysql = require('../config/mysql');
const {DbOption}=require('../config/dbservice.enums');
const chalk = require('chalk');
const E = require('../errors');

module.exports.createProduct =async  ({productName,brandId}) =>  {
    console.log(chalk.yellow('>>> createProduct data service method (start)'));
    const connection = await mysql.connection();
    try {
        console.log(chalk.yellow('>>> createProduct data service method (try block) '));
        let query =  `INSERT INTO products (product_name,brand_id) VALUES (?,?)`;
            results = await connection.query(query, [productName,brandId]);
            console.log(results);
            return results;
    } catch (error) {
        console.log(chalk.red.blue( '>>> createProduct data service method (catch block) '));
        console.log(error);
        if (error.code === 'ER_DUP_ENTRY') {
        throw new E.DuplicateError({parameter:'Product name',values:productName});
        }else{
            throw new E.InternalError({error});
        }
    } finally {
        //https://stackoverflow.com/questions/3837994/why-does-a-return-in-finally-override-try
        //Learning note: finally block always executes regardless there is a return result command at the 
        //try block.
        await connection.release(); //Need to release the database connection in the finally block.
        console.log(chalk.yellow('>>> createProduct data service method (finally block)'));
    }

};
//End of createProduct data service method



