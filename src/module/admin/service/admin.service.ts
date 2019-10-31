import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../../common/interface/admin.interface';

@Injectable()
export class AdminService {
    private readonly flterKey:string;
    constructor(
        @InjectModel('Admin') private readonly adminModel: Model
    ) {
        this.flterKey = `nickName status userName password Email add_time`
    }


    //新增注册
    public async createAdminUser(user: User): Promise<User> {
        const createAdmin = new this.adminModel(user)
        return await createAdmin.save()
    }


    //查找登录
    public async findOne(userName: string): Promise<User> {
        return await this.adminModel.findOne({userName}, this.flterKey).exec()
    }

    
    //查找全部
    public async findAll(): Promise<User []> {
        return this.adminModel.find({}, this.flterKey).exec()
    }

}
