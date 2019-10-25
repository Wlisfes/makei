import { Controller, Get, Query  } from '@nestjs/common';
import { AdminService } from '../../service/admin/admin.service';


@Controller('api/auth/admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService
    ){}
    
    @Get()
    public async Register() {
        const result = await this.adminService.postRegister({
            nickName: '情雨随风',
            userName: 'admin',
            password: '000000',
            Avatar: '/assets/album/0bc087d84ae4a.png',
            Email: '876451336@qq.com'
        })

        return result
    }

    @Get('findAll')
    public async findAll(@Query() query) {
        const result = await this.adminService.findOne(query)

        return result
    }
}
