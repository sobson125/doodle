import {CustomError} from './custom-error';

export class NotFoundError extends CustomError {
    private _statusCode: number = 404;

    get statusCode(): number {
        return this._statusCode;
    }

    constructor() {
        super('route not found');
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors(): { message: string; field?: string }[] {
        return [{message: 'not found'}];
    }

}