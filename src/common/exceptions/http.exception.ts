const NOT_FOUND_EXCEPTION_DEFAULT_MESSAGE = "Not found";
const NOT_ALLOWED_EXCEPTION_DEFAULT_MESSAGE = "Not allowed";
const UNAUTHORIZED_EXCEPTION_DEFAULT_MESSAGE = "Unauthorized";
const BAD_REQUEST_EXCEPTION_DEFAULT_MESSAGE = "Bad request";
const INTERNAL_ERROR_EXCEPTION_DEFAULT_MESSAGE = "Bad request";

export class HTTPException extends Error {

    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }

}

export class NotFoundException extends HTTPException {

    constructor(message: string = NOT_FOUND_EXCEPTION_DEFAULT_MESSAGE) {
        super(404, message);
    }

}

export class NotAllowedException extends HTTPException {

    constructor(message: string = NOT_ALLOWED_EXCEPTION_DEFAULT_MESSAGE) {
        super(403, message);
    }

}

export class UnauthorizedException extends HTTPException {

    constructor(message: string = UNAUTHORIZED_EXCEPTION_DEFAULT_MESSAGE) {
        super(401, message);
    }

}

export class BadRequestException extends HTTPException {

    constructor(message: string = BAD_REQUEST_EXCEPTION_DEFAULT_MESSAGE) {
        super(400, message);
    }

}

export class InternalErrorException extends HTTPException {

    constructor(message: string = INTERNAL_ERROR_EXCEPTION_DEFAULT_MESSAGE) {
        super(500, message);
    }

}
