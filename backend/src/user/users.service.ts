import { InjectRepository } from '@nestjs/typeorm';
import { ILike, IsNull, Repository } from 'typeorm';
import { genSalt, hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SignUpDto, SignUpResponseDto } from './dto/signup.dto';
import { Users } from './entities/users.entity';
import { JwtPayload } from './auth/jwt-payload.model';
import { LoginDto, LoginResponseDto } from './dto/login.dto';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private readonly jwtPrivateKey: string;
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) {
        this.jwtPrivateKey = process.env.JWT_PRIVATE_KEY;
    }

    private isEmail(emailOrPhone: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(emailOrPhone);
    }

    async getUser(emailOrName: string) {
        const isEmail = this.isEmail(emailOrName);
        if (isEmail) {
            return await this.usersRepository.findOne({
                where: {
                    email: emailOrName,
                    deletedAt: IsNull(),
                },
            });
        } else {
            return await this.usersRepository.findOne({
                where: {
                    name: ILike(emailOrName),
                    deletedAt: IsNull(),
                },
            });
        }
    }

    async checkExistingUserStatus(email: string) {
        return await this.usersRepository.findOne({
            where: {
                email: email,
                deletedAt: IsNull(),
            },
        });
    }

    async getUserByEmailAndCheckStatus(email: string) {
        return await this.usersRepository.findOne({
            where: {
                email: email,
                deletedAt: IsNull(),
            },
        });
    }

    async signToken(payload: JwtPayload) {
        // return sign(payload, this.jwtPrivateKey, { expiresIn: '60m' });
        return sign(payload, this.jwtPrivateKey);
    }

    async create(createUserDto: SignUpDto): Promise<SignUpResponseDto | any> {
        const { email } = createUserDto;

        if (!email) {
            throw new HttpException(
                'Either email or phone number must be provided.',
                HttpStatus.BAD_REQUEST,
            );
        }

        if (email) {
            const userStatus = await this.getUserByEmailAndCheckStatus(
                email.trim().toLowerCase(),
            );

            if (userStatus) {
                throw new HttpException(
                    'User already Exists.',
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        if (email) {
            const initialUser = await this.checkExistingUserStatus(
                email.trim().toLowerCase(),
            );
            if (initialUser?.email) {
                const signTokenPayload: JwtPayload = {
                    email: initialUser.email,
                    name: initialUser.name,
                };
                const token = await this.signToken(signTokenPayload);

                return {
                    status: 201,
                    id: initialUser.id,
                    token: token,
                    notVerify: true,
                    msg: `User is register.`,
                };
            }
        }

        try {
            const user = new Users();
            user.name = createUserDto.name;
            user.email = createUserDto.email
                ? createUserDto.email.trim().toLowerCase()
                : null;

            const salt = await genSalt(10);
            user.password = await hash(createUserDto.password, salt);
            const userData = await this.usersRepository.save(user);

            const signTokenPayload: JwtPayload = {
                email: userData.email,
                name: userData.name,
            };
            const token = await this.signToken(signTokenPayload);

            return new SignUpResponseDto({ ...userData }, token);
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    async login(loginDto: LoginDto): Promise<LoginResponseDto> {
        try {
            const { email, password } = loginDto;

            let user;

            user = await this.getUser(email.trim().toLowerCase());

            if (!user) {
                throw new HttpException(
                    'Invalid email or password.',
                    HttpStatus.BAD_REQUEST,
                );
            }

            const isMatch = await compare(password, user.password);
            if (!isMatch) {
                throw new HttpException(
                    'Invalid Password.',
                    HttpStatus.BAD_REQUEST,
                );
            }

            // generating token
            const signTokenPayload: JwtPayload = {
                email: user.email,
                name: user.name,
            };

            const token = await this.signToken(signTokenPayload);
            return new LoginResponseDto(user, token);
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }
}
