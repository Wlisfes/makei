import { Controller, Headers, Get, Post, Body, Query } from '@nestjs/common';
import { AuthService } from '../../auth/service/auth.service';
import { AdminService } from '../service/admin.service';

@Controller('api/admin')
export class AdminController {
    constructor(
        private readonly authService: AuthService,
        private readonly adminService: AdminService
    ) {}


    @Post('create')
    public async createAdminUser(@Body() body): Promise<any> {
        const result = await this.adminService.createAdminUser(body)
        return result
    }


    @Post('login')
    async login(@Body() body): Promise<any> {
        const result = await this.adminService.findOne(body.userName)
        if(result) {
            if(result.password === body.password) {
                const token = await this.authService.signToken(result._id, body.userName)

                return token
            }
        }

        // return result
    }

    @Get('info')
    async getInfo(@Headers('authorization') token): Promise<any> {
        const res = await this.authService.verifyToken(token)

        console.log(res)
        
        return res
    }


    @Post('findAll')
    public async findAll(): Promise<any> {

    }
}
