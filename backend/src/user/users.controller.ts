import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Res,
    UseGuards,
} from '@nestjs/common';

import { SignUpDto, SignUpResponseDto } from './dto/signup.dto';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post('register')
    @HttpCode(200)
    @ApiOperation({ summary: 'Get Yourself registered' })
    @ApiOkResponse({ type: SignUpResponseDto })
    async register(
        @Body() createUserDto: SignUpDto,
        @Res() res: Response,
    ): Promise<void> {
        try {
            const { token, user } =
                await this.userService.create(createUserDto);

            // Set the JWT token in a cookie
            res.cookie('token', token, {
                httpOnly: true, // Cookie not accessible via JavaScript
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                maxAge: 3600000, // 1 hour in milliseconds
                sameSite: 'lax', // Helps prevent CSRF attacks
            });

            res.status(HttpStatus.OK).json({
                message: 'Registration successful',
                user,
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: error.message || 'Registration failed',
            });
        }
    }

    @Post('login')
    @HttpCode(200)
    @ApiOperation({ summary: 'Get Your self login here' })
    @ApiOkResponse({ type: LoginResponseDto })
    async login(
        @Body() loginDto: LoginDto,
        @Res() res: Response,
    ): Promise<void> {
        try {
            const { token, user } = await this.userService.login(loginDto);

            // Set the JWT token in a cookie
            res.cookie('token', token, {
                httpOnly: true, // Cookie not accessible via JavaScript
                secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
                maxAge: 3600000, // 1 hour in milliseconds
                sameSite: 'lax', // Helps prevent CSRF attacks
            });

            res.status(HttpStatus.OK).json({
                message: 'Login successful',
                user,
            });
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json({
                message: error.message || 'Login failed',
            });
        }
    }

    @Post('logout')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    async logout(@Res() res: Response): Promise<void> {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        res.status(HttpStatus.OK).json({
            message: 'Logout successful',
        });
    }
}
