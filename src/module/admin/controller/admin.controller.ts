import { Controller, Headers, Get, Post, Body, Query, HttpStatus, HttpException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from '../../auth/service/auth.service';
import { AdminService } from '../service/admin.service';
import { ToolService } from '../../../common/service/tool.service';
import { User } from '../../../common/interface/admin.interface';

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
        console.log(body)
        if(!body.userName) throw new HttpException('userName不能为空！', HttpStatus.BAD_REQUEST)
        if(!body.password) throw new HttpException('password不能为空！', HttpStatus.BAD_REQUEST)
        if(!body.nickName) throw new HttpException('nickName不能为空！', HttpStatus.BAD_REQUEST)
        if(!body.Email) throw new HttpException('Email不能为空！', HttpStatus.BAD_REQUEST)
        if(!file) throw new HttpException('file不能为空！', HttpStatus.BAD_REQUEST)

        const One = await this.adminService.findOne(body.userName,)

        if(One) throw new HttpException('userName已注册！', HttpStatus.BAD_REQUEST)
        if(One.Email === body.Email) throw new HttpException('Email已注册！', HttpStatus.BAD_REQUEST)

        //图片存储
        const After = file.originalname.substring(file.originalname.lastIndexOf('.'))  //图片后辍
        const Rename = `${Date.now()}${After}`  //图片重命名
        const Write = fs.createWriteStream(path.join(__dirname, '../../../../../public/upload/avatar', Rename))
            Write.write(file.buffer)

        const result = await this.adminService.createAdminUser({
            nickName: body.nickName,
            userName: body.userName,
            password: this.toolService.signMD5(body.password),
            Email: body.Email,
            Avatar: `/upload/avatar/${Rename}`
        })
        this.toolService.success({
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
    async getInfo(@Headers('authorization') token: string): Promise<any> {
        try {
            const Auth = await this.authService.verifyToken(token)
            const AuthNode = await this.authService.findOne(Auth.uid)
            if(AuthNode && AuthNode.access_token === token) {
                const Info = await this.adminService.findOne(Auth.name)
                return this.toolService.success({
                    code: HttpStatus.OK,
                    message: '获取成功！',
                    data: Info
                })
            }
            throw new HttpException('token错误！', HttpStatus.UNAUTHORIZED)
        } catch (error) {
            throw new HttpException('token错误！', HttpStatus.UNAUTHORIZED)
        }
    }


    @Post('findAll')
    public async findAll(): Promise<any> {

    }
}
