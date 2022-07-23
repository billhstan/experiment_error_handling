const { BaseError } = require('./BaseError');

class InternalError extends BaseError {
    constructor({error}) {
        super();
        this.name = 'InternalError';
        this.message = 'An error has occurred in the application.';
        this.statusCode = 500;
        this.originalError = error;
    }
}

module.exports = { InternalError };