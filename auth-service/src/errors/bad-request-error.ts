import {CustomError} from './custom-error';

export class BadRequestError extends CustomError {
    private _statusCode: number = 400;

    get statusCode(): number {
        return this._statusCode;
    }

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors(): { message: string; field?: string }[] {
        return [{message: this.message}];
    }

}
