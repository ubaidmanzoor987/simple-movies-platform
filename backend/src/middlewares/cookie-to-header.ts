// src/middleware/cookie-to-header.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as cookieParser from 'cookie-parser';

@Injectable()
export class CookieToHeaderMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        cookieParser()(req, res, () => {
            const token = req.cookies['token'];
            if (token) {
                req.headers['authorization'] = `Bearer ${token}`;
            }
            next();
        });
    }
}
