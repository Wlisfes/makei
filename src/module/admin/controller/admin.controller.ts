import { Controller, Headers, Get, Post, Body, Query, HttpStatus } from '@nestjs/common';
import { AuthService } from '../../auth/service/auth.service';
import { AdminService } from '../service/admin.service';
import { ToolService } from '../../../common/service/tool.service';

@Controller('api/admin')
export class AdminController {
    constructor(
        private readonly authService: AuthService,
        private readonly adminService: AdminService,
        private readonly toolService: ToolService
    ) {}

    
    /**
     * 注册
     * @param body 
     */
    @Post('create')
    public async createAdminUser(@Body() body): Promise<any> {
        const result = await this.adminService.createAdminUser(body)
        return result
    }


    /**
     * 登录
     * @param body 
     */
    @Post('login')
    async login(@Body() body): Promise<any> {
        const result = await this.adminService.findOne(body.userName)
        if(result) {
            if(result.password === body.password) {
                const token = await this.authService.signToken(result._id, result.userName)
                return this.toolService.success({
                    code: HttpStatus.OK,
                    message: '登录成功！',
                    data: {
                        userName: result.userName,
                        Avatar: result.Avatar,
                        nickName: result.nickName,
                        add_time: result.add_time,
                        Email: result.Email,
                        accessToken: token
                    }
                })
            }
        }
    }


    @Get('info')
    async getInfo(@Headers('authorization') token): Promise<any> {
        const Auth = await this.authService.verifyToken(token)
        const Info = await this.adminService.findOne(Auth.name)
        // console.log(res)
        
        // return res

        console.log(Info)
        return Info
    }


    @Post('findAll')
    public async findAll(): Promise<any> {

    }
}
