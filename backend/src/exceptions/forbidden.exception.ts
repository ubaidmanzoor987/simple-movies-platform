import { ForbiddenException } from '@nestjs/common';

export class ForbiddenResourceException extends ForbiddenException {
    constructor() {
        super('You are not authorized to access this resource');
    }
}
