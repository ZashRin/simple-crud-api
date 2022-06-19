import { ERROR_MESSAGES } from './messages';

export class BaseError {
    message: string;
    code: number;

    constructor(message: string, code = 500) {
        this.message = message;
        this.code = code;
    }
}

export class NotFoundError extends BaseError {
    constructor(message: string = ERROR_MESSAGES.NOT_FOUND) {
        super(message, 404);
    }
}

export class ServerInternalError extends BaseError {
    constructor(message: string = ERROR_MESSAGES.SERVER_INTERNAL) {
        super(message, 500);
    }
}

export class InvalidUUIDError extends BaseError {
    constructor(id: string) {
        id === '' ?
            super(`UserID is empty`, 400) :
            super(`UserID = ${id} is invalid (not uuid)`, 400);
    }
}

export class NotExistUserError extends BaseError {
    constructor(id: string) {
        super(`User with UserID = ${id} not found`, 404);
    }
}

export class CrashDataBaseError extends BaseError {
    constructor() {
        super(`DB is corrupted\n. Please reload the App`, 400);
    }
}

export class BadRequestError extends BaseError {
    constructor(option: string) {
        switch (option) {
            case 'field':
                super(`${ERROR_MESSAGES.BAD_REQUEST}\nRequst.body does not contain required fields`, 400);
                break;
            case 'username':
                super(`${ERROR_MESSAGES.BAD_REQUEST}\nusername must be a string`, 400);
                break;
            case 'age':
                super(`${ERROR_MESSAGES.BAD_REQUEST}\nage must be a number`, 400);
                break;
            case 'hobbies':
                super(`${ERROR_MESSAGES.BAD_REQUEST}\nhobbies must be an array`, 400);
                break;
            case 'hobbiesArray':
                super(`${ERROR_MESSAGES.BAD_REQUEST}\nhobbiy must be a string`, 400);
                break;
        }
    }
}