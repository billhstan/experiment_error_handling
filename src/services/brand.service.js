//product.service.js
const mysql = require('../config/mysql');
const {DbOption}=require('../config/dbservice.enums');
const chalk = require('chalk');
const E = require('../errors');

module.exports.createBrand =async  ({brandName}) =>  {
    console.log(chalk.magenta('>>> createBrand data service method (start)'));
    const connection = await mysql.connection();
    try {
        console.log(chalk.yellow('>>> createBrand data service method (try block) '));
        let query =  `INSERT INTO brands (brand_name) VALUES (?)`;
            results = await connection.query(query, [brandName]);
            console.log(results);
            return results;
    } catch (error) {
        console.log(chalk.red.bold( '>>> createBrand data service method (catch block) '));
        console.log(error);
        if (error.code === 'ER_DUP_ENTRY') {
            throw new E.DuplicateError({parameter:'brand name',values:brandName});
        }else{
            throw new E.InternalError({error});
        }
    } finally {
        //https://stackoverflow.com/questions/3837994/why-does-a-return-in-finally-override-try
        //Learning note: finally block always executes regardless there is a return result command at the 
        //try block.
        await connection.release(); //Need to release the database connection in the finally block.
        console.log(chalk.yellow('>>> createBrand data service method (finally block)'));
    }

};
//End of createBrand data service method

module.exports.deleteBrand =async  ({brandId}) =>  {
    console.log(chalk.magenta('>>> deleteBrand data service method (start)'));
    const connection = await mysql.connection();
    try {
        console.log(chalk.yellow('>>> deleteBrand data service method (try block) '));
        let query =  `DELETE FROM brands WHERE brand_id=?`;
            results = await connection.query(query, [brandId]);
            console.log(results);
            return results;
    } catch (error) {
        console.log(chalk.red.bold( '>>> deleteBrand data service method (catch block) '));
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            throw new E.BusinessRuleError({message:'Cannot delete brand because there are products tied to the respective brand name.'});
        }else{
            throw new E.InternalError({error});
        }
    } finally {
        await connection.release(); //Need to release the database connection in the finally block.
        console.log(chalk.yellow('>>> deleteBrand data service method (finally block)'));
    }

};
//End of deleteBrand data service method



