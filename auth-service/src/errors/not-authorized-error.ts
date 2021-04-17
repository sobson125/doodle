import {CustomError} from './custom-error';

export class NotAuthorizedError extends CustomError {
    private _statusCode: number = 401;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    get statusCode(): number {
        return this._statusCode;
    }

    serializeErrors() {
        return [{message: 'Not authorized'}];
    }

}
