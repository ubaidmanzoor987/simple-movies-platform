import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { JwtStrategy } from './auth/jwt-strategy';
import { UsersController } from './users.controller';
import { Module } from '@nestjs/common';


@Module({
    imports: [TypeOrmModule.forFeature([Users]),],
    controllers: [UsersController],
    providers: [UsersService, JwtStrategy, JwtService],
    exports: [UsersService]
})

export class UsersModule { }
