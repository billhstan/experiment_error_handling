const BaseError = require('./baseError');
const ValidationError = require('./validationError');
const InternalError = require('./internalError');
const BusinessRuleError = require('./businessruleError');
module.exports = {
    ...BaseError,
    ...ValidationError,
    ...InternalError,
    ...BusinessRuleError
};