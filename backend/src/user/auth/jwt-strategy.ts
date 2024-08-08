import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { JwtPayload } from './jwt-payload.model';
import { UsersService } from '../users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_PRIVATE_KEY,
        });
    }

    async validate(payload: JwtPayload, done: VerifiedCallback) {
        try {
            const user = await this.usersService.getUser(payload.email);

            if (!user) {
                return done(
                    new HttpException({}, HttpStatus.UNAUTHORIZED),
                    false,
                );
            }

            return done(null, user);
        } catch (err) {
            console.log('err', err);
        }
    }
}
