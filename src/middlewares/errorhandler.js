//errorhandler.js
const chalk = require('chalk');
const E = require('../errors');
const logger = require('../utils/logger');
//console.log(E);


module.exports = (error, req, res, next) => {
    //Don't mutate the arguments
    console.log(error);
    let err = error;

    for (const [key, value] of Object.entries(E)) {
     if (error instanceof value) {
      console.log(chalk.green('Able to identiFy the error type as '),key  );
     }
    }

    //Custom errors
    //Choose which type of error you wish to log it.

    if (error instanceof E.InternalError) {
        err = error;
        logger.error(err.toLog());
    }
    /*
    if (error instanceof E.DatabaseError) {
        err = error;
        logger.error(err.toLog());
    }
    

    else if (error instanceof E.AuthorisationError) {
        err = error;
        logger.warn(err.toLog());
    }

    else if (error instanceof E.AuthenticationError) {
        err = error;
        logger.warn(err.toLog());
    }

    else if (error instanceof E.BaseError) {
        err = error;
        logger.info(err.toLog());
    }

    // fallback for other errors
    else {
        err = new E.InternalError(error);
        logger.error(err.toLog());
    }
*/

    // check if there was already a response
    if (!res.headersSent) {
        res.status(err.statusCode).send(err.toJSON());
    }

    // HACK for dev
    console.log(err);
};