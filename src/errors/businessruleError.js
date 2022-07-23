const { BaseError } = require('./baseError');
//BusinessRuleError
class BusinessRuleError extends BaseError {
    constructor({message}) {
        super();
        this.name = 'BusinessRuleError';
        this.message =message;
        this.status = 400;
    }
}

module.exports = { BusinessRuleError };