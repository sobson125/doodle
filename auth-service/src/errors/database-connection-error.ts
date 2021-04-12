import {CustomError} from './custom-error';

export class DatabaseConnectionError extends CustomError {

    private _reason = 'Error connecting to database';
    private _statusCode = 500;

    constructor() {
        super('db error');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    get statusCode(): number {
        return this._statusCode;
    }

    serializeErrors() {
        return [
            {message: this._reason}
        ];
    }
}