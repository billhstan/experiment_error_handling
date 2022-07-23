//auth.service.js
const mysql = require('../config/mysql');
const {DbOption}=require('../config/dbservice.enums');


module.exports.findRefreshToken =async  ({userId, actionType}) =>  {
    const connection = await mysql.connection();
    let results;
    switch (actionType){
        case DbOption.FIND_ALL_TIED_TO_ONE_USER_ID:
    try {
        //This switch case logic needs refreshToken parameter value.
        console.log(' --- Running findRefreshToken  (search by user id)  data service method (try block)  --- ');
        let query =  `SELECT refresh_token_id,user_id,token, DATE_FORMAT(created_at, '%h:%i %p') AS 'created_at' FROM 
              refresh_tokens   WHERE user_id=?`;
            results = await connection.query(query, [userId ]);
    } catch (err) {
        console.log('--- Running findRefreshToken  (search by user id)  data service method (catch block) --- ', err);
        throw err;
    } finally {
        await connection.release();
        return results; //returns an array
        //To access the results use: results[0].number_of_tokens
        break;
    }
    }//End of switch
};
//End of countRefreshToken data service method


