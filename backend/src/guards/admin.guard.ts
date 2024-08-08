import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminGuard implements CanActivate {

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = this.extractToken(request);

        if (!token) {
            throw new ForbiddenException('No token found');
        }
        const onlyToken = token.split(' ')[1];
        const user = this.decodeToken(onlyToken);

        if (
            user.roles.includes('admin') ||
            user.roles.includes('super-admin')
        ) {
            return true;
        } else {
            throw new ForbiddenException(
                'You do not have permission to access this resource',
            );
        }
    }

    private extractToken(request): string | null {
        if (request.headers.authorization) {
            return request.headers.authorization;
        }
        return null;
    }

    private decodeToken(token: string): any {
        const decoded = jwt.decode(token);
        return { roles: decoded['role'] ? [decoded['role']] : [] };
    }
}
