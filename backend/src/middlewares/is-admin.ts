
import { NextFunction, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

import { ERROR_MESSAGES } from 'src/constants';
import { UsersService } from 'src/user/users.service';
import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
dotenv.config();

@Injectable()
export class isAdmin implements NestMiddleware {
    constructor(
        private readonly usersService: UsersService,
    ) {}
    async use(req: Request, res: Response, next: NextFunction) {
        let token: string = req.headers['authorization'];
        if (!token) {
            throw new HttpException(
                ERROR_MESSAGES.UNAUTHORIZED,
                HttpStatus.UNAUTHORIZED,
            );
        }
        token = token?.split(' ')[1];

        const decodedToken: any = jwt.verify(
            token,
            process.env.JWT_PRIVATE_KEY,
        );
        const email = decodedToken.email;
        const user = await this.usersService.getUser(email);
        if (!user) {
            throw new HttpException(
                ERROR_MESSAGES.USER_NOT_FOUND,
                HttpStatus.UNAUTHORIZED,
            );
        }
        next();
    }
}
