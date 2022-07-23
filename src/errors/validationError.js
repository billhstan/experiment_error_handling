const { BaseError } = require('./baseError');
//ParameterInputError
class ParameterInputError extends BaseError {
    constructor() {
        super();
        this.name = 'ParameterInputError';
        this.message = 'Incorrect value(s) provided.';
        this.status = 400;
    }
}
//DuplicateError
class DuplicateError extends ParameterInputError {
    constructor({parameter, entity = null, values = null}) {
        super();
        this.name = 'DuplicateError';
        this.message = entity
            ? `The ${parameter} is in use by another ${entity}.`
            : `The ${parameter} has already been used.`;
        this.status = 400;
        this.values = Array.isArray(values)
            ? values
            : [values];
    }
}
module.exports = { ParameterInputError, DuplicateError };