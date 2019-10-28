import {
    Controller,
    Get,
    Post,
    Delete,
    Query,
    Body,
    UseInterceptors,
    UploadedFile,
    UsePipes,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AdminService } from '../../service/admin/admin.service';
import { ToolService } from '../../../../common/service/tool/tool.service';
import { ValidationPipe } from '../../../../common/pipe/validation.pipe';

import { createWriteStream } from 'fs';
import { join } from 'path';

import { RegisterDto,LoginDto } from '../../../../common/validator/admin.dto';
import { isId } from '../../../../common/validator/common.dto';





@Controller('api/auth/admin')

export class AdminController {
    constructor(
        private readonly adminService: AdminService,
        private readonly toolService: ToolService
    ){}


    @Get()
    async Index() {
        return 'admin'
    }
    
    
    //注册
    @Post('register')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('file'))
    public async Register(@UploadedFile() file, @Body() body: RegisterDto): Promise<any> {
        try {
            if(!file) {
                throw new HttpException('Avatar不能为空！', HttpStatus.BAD_REQUEST)
            }
                
            const One = await this.adminService.getmodel().findOne({
                userName: body.userName
            })
            if(One) {
                // if(One.Email === body.Email) {
                //     throw new HttpException('Email已存在！', HttpStatus.BAD_REQUEST)
                // }
                throw new HttpException('userName已存在！', HttpStatus.BAD_REQUEST)
            }

            
            const After = file.originalname.substring(file.originalname.lastIndexOf('.'))
            const Rename = `${Date.now()}${After}`
            const Write = createWriteStream(join(__dirname, '../../../../../public/upload/avatar', Rename))
                Write.write(file.buffer)

            const result = await this.adminService.postRegister({
                nickName: body.nickName,
                userName: body.userName,
                password: this.toolService.getMD5(body.password),
                Avatar: `/upload/avatar/${Rename}`,
                Email: body.Email
            })
            return this.toolService.success({
                data: result,
                message: '注册成功！',
                code: HttpStatus.OK
            })
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST)
        }
    }


    //登录
    @Post('login')
    @UsePipes(new ValidationPipe())
    public async Login(@Body() body: LoginDto): Promise<any> {
        try {
            const result = await this.adminService.getmodel().findOne({
                userName: body.userName
            }, `status nickName userName Avatar Email add_time`)
            if(result) {
                if(this.toolService.getMD5(body.password) === result.password) {
                    return this.toolService.success({
                        data: result,
                        message: '登录成功！',
                        code: HttpStatus.OK
                    })
                }
                throw new HttpException('密码错误！', HttpStatus.UNAUTHORIZED)
            }
            else {
                throw new HttpException('该用户不存在！', HttpStatus.UNAUTHORIZED)
            }
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST)
        }
    }


    //获取全部管理员
    @Get('findAll')
    public async findAll(): Promise<any> {
        try {
            const result = await this.adminService.findAll()
            return this.toolService.success({
                data: result,
                message: '获取成功！',
                code: HttpStatus.OK
            })
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST)
        }
    }


    //根据id获取
    @Get('findById')
    public async findById(@Query() query): Promise<any> {
        try {
            const result = await this.adminService.findById(query.id)
            if(result) {
                return this.toolService.success({
                    data: result,
                    message: '获取成功！',
                    code: HttpStatus.OK
                })
            }
            else {
                throw new HttpException('id错误！', HttpStatus.BAD_REQUEST)
            }
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST)
        }
    }


    //根据id删除
    @Delete('delete')
    @UsePipes(new ValidationPipe())
    public async deleteOne(@Query() query: isId): Promise<any> {
        try {
            const result = await this.adminService.deleteOne(query.id)
            if(result.deletedCount === 1) {
                return this.toolService.success({
                    message: '删除成功！',
                    code: HttpStatus.OK
                })
            }
            throw new HttpException('id错误！', HttpStatus.BAD_REQUEST)
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST)
        }
    }


    //修改用户信息
    @Post('update')
    @UsePipes(new ValidationPipe())
    public async updateOne(@Body() body: isId): Promise<any> {

        console.log(body)
    }
}
