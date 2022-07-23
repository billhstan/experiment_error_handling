const fns = require('date-fns');
class BaseError extends Error {
    // The inherited members are:
    // name;
    // message;
    // stack;

    // I provide new members
    statusCode; // http status code
    datetime; // When did the error happen
    values; // The value(s) that cause the error (E.g. The [bob@email.com] has been used.)

    originalError = null; //In case I need to wrap around the original error. (usually for logging)
    severity; // Describe how important the error is, perhaps useful for logging (usually for logging)

    constructor() {
        super();
        this.name = 'BaseError';
        this.message = 'An error has occurred.';
        this.statusCode = 400;
        this.datetime = fns.formatISO(new Date(),{representation:'complete'});
    }



    // For http response
    toJSON() {
        return ({
            ok: false,
            statusCode: this.statusCode,
            message: 'An error has occurred.',
            error: {
                name: this.name,
                message: this.message,
                values: this.values
            },
            datetime: this.datetime
        });
    }
    // for logging
    toLog() {
        let originalError = null;
//https://www.codegrepper.com/code-examples/javascript/escape+json+in+javascript
//I used the code sample given online, to ensure the stack property string value is properly escaped so that
//the entire error data can be viewed on a JSON viewer tool.
        if (this.originalError) {
            originalError = {
                name: this.originalError.name ?? 'unknown',
                message: this.originalError.message ?? 'unknown',
                stack: this.originalError.stack.replace(/\\n/g, "\\n")
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, "\\&")
                .replace(/\\r/g, "\\r")
                .replace(/\\t/g, "\\t")
                .replace(/\\b/g, "\\b")
                .replace(/\\f/g, "\\f")?? 'unknown',
                ...this.originalError
            };
        }
        
        
        return ({
            name: this.name,
            message: this.message,
            stack: this.stack,
            datetime: this.datetime,
            database: this.database,
            originalError
        });
    }
}//End of BaseError class

module.exports = { BaseError };