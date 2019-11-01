import {
    Controller, Headers, Get, Post, Body,
    HttpStatus, HttpException, UseInterceptors,
    UploadedFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from '../../auth/service/auth.service';
import { AdminService } from '../service/admin.service';
import { ToolService } from '../../../common/service/tool.service';
import { User } from '../../../common/interface/admin.interface';
import { Roles } from '../../../common/decorator/roles.decorator';



import * as fs from 'fs';
import * as path from 'path';

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
    @UseInterceptors(FileInterceptor('file'))
    public async createAdminUser(@Body() body: User, @UploadedFile() file): Promise<any> {
        if(!body.userName) return this.toolService.fali({code: HttpStatus.BAD_REQUEST, message: 'userName不能为空！'})
        if(!body.password) return this.toolService.fali({code: HttpStatus.BAD_REQUEST, message: 'password不能为空！'})
        if(!body.nickName) return this.toolService.fali({code: HttpStatus.BAD_REQUEST, message: 'nickName不能为空！'})    
        if(!body.Email) return this.toolService.fali({code: HttpStatus.BAD_REQUEST, message: 'Email不能为空！'})
        if(!file) return this.toolService.fali({code: HttpStatus.BAD_REQUEST, message: 'file不能为空！'})

        const One = await this.adminService.findOne(body.userName)
        if(One) return this.toolService.fali({code: HttpStatus.BAD_REQUEST, message: 'userName已注册！'})

        const OneEmail = await this.adminService.findEmail(body.Email)
        if(OneEmail) return this.toolService.fali({code: HttpStatus.BAD_REQUEST, message: 'Email已注册！'})

        
        //图片存储
        const After = file.originalname.substring(file.originalname.lastIndexOf('.'))  //图片后辍
        const Rename = `${Date.now()}${After}`  //图片重命名
        const Write = fs.createWriteStream(path.join(__dirname, '../../../../public/upload/avatar', Rename))
            Write.write(file.buffer)

        const result = await this.adminService.createAdminUser({
            nickName: body.nickName,
            userName: body.userName,
            password: this.toolService.signMD5(body.password),
            Email: body.Email,
            Avatar: `/upload/avatar/${Rename}`
        })
        return this.toolService.success({
            code: HttpStatus.OK,
            message: '注册成功！',
            data: result
        })
    }


    /**
     * 登录
     * @param body 
     */
    @Post('login')
    async login(@Body() body): Promise<any> {
        console.log(body)
        const result = await this.adminService.findOne(body.userName)
        if(result) {
            if(result.password === this.toolService.signMD5(body.password)) {
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
            throw new HttpException('password错误！', HttpStatus.UNAUTHORIZED)
        }
        throw new HttpException('userName错误！', HttpStatus.UNAUTHORIZED)
    }


    @Get('info')
    @Roles('admin')
    async getInfo(@Headers('authorization') token: string): Promise<any> {
        try {
            const Auth = await this.authService.verifyToken(token)
            const Info = await this.adminService.findOne(Auth.name)
            return this.toolService.success({
                code: HttpStatus.OK,
                message: '获取成功！',
                data: Info
            })
        } catch (error) {
            throw new HttpException('token错误！', HttpStatus.UNAUTHORIZED)
        }
    }


    @Get('findAll')
    public async findAll(): Promise<any> {

        return true
    }
}
