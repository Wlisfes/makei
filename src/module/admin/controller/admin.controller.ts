import { Controller, Headers, Get, Query } from '@nestjs/common';
import { AuthService } from '../../auth/service/auth.service';

@Controller('api/admin')
export class AdminController {
    constructor(
        private readonly authService: AuthService
    ) {}


    @Get('login')
    async login(@Query() query): Promise<any> {
        const res = await this.authService.signToken('111', query.name)

        console.log(res)

        return res
    }

    @Get('info')
    async getInfo(@Headers('authorization') token): Promise<any> {
        const res = await this.authService.verifyToken(token)

        console.log(res)
        
        return res
    }
}
