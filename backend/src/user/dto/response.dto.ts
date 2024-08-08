import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../entities/users.entity';

export class GetAllResponse {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email?: string;

}

export class GetDeleteResponse {
    @ApiProperty()
    user: Partial<Users>;

    constructor(user: Partial<Users>) {
        const output = {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            deletedAt: user.deletedAt,
        };
        this.user = output;
    }
}

export class ForgetPasswordWithNumberDTO {
    @ApiProperty()
    status: number;
    @ApiProperty()
    res: string;
    @ApiProperty()
    msg: string;
}
