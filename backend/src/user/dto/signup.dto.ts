import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, ValidateIf } from 'class-validator';

import { Users } from '../entities/users.entity';

export class SignUpDto {
    @ApiProperty()
    @IsString()
    readonly name: string;
  
    @ApiProperty({ uniqueItems: true })
    @IsEmail({}, { message: 'Invalid email format' }) // Always validate email
    readonly email: string;
  
    @ApiProperty()
    @IsString()
    @MinLength(5)
    readonly password: string;
  }
  

export class SignUpResponseDto {
    @ApiProperty()
    token: string;

    @ApiProperty()
    user: Partial<Users>;

    constructor(user: Partial<Users>, token?: string) {
        const outputObj = {
            id: user.id,
            name: user.name,
            email: user.email,
        };
        this.token = token;
        this.user = outputObj;
    }
}
