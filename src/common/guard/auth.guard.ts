import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../../module/auth/service/auth.service';
import { ToolService } from '../service/tool.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly toolService: ToolService,
        private readonly reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const roles = this.reflector.get<string[]>('roles', context.getHandler())
            if(!roles) return true;
            const request = context.switchToHttp().getRequest();
            const token = request.headers['authorization']
            if (token) {
                const Auth = await this.authService.verifyToken(token)
                return true;
            }
        } catch (error) {

        }
    }
}
