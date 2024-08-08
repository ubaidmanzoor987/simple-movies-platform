import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MiddlewareConsumer, Module } from '@nestjs/common';

import { getDatabaseConfig } from 'db/dataSource';

import { CookieToHeaderMiddleware } from './middlewares/cookie-to-header';

import { Users } from './user/entities/users.entity';
import { JwtStrategy } from './user/auth/jwt-strategy';
import { UsersModule } from './user/users.module';

import { MoviesModule } from './movies/movies.module';
import { Movie } from './movies/entities/movie.entity';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            useFactory: getDatabaseConfig,
        }),
        JwtModule.register({
            secret: process.env.JWT_PRIVATE_KEY,
            signOptions: { expiresIn: '60m' },
        }),
        TypeOrmModule.forFeature([Users, Movie]),
        MoviesModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService, JwtStrategy],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(CookieToHeaderMiddleware).forRoutes('*');
    }
}
