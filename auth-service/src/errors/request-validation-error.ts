import {ValidationError} from 'express-validator';
import {CustomError} from './custom-error';

export class RequestValidationError extends CustomError {
    private _statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super('invalid request');
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    get statusCode(): number {
        return this._statusCode;
    }

    serializeErrors() {
        return this.errors.map(error => {
            return {message: error.msg, field: error.param};
        });
    }
}