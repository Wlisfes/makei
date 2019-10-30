import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AdminSchema } from '../../../schema/admin.schema'

@Injectable()
export class AdminService {
    constructor(
        @InjectModel('Admin') private readonly adminModel: Model
    ) {}


    public async createAdminUser(User): Promise<any> {
        const createAdmin = new this.adminModel(User)
        return await createAdmin.save()
    }


    public async findOne(userName: string): Promise<any> {
        return await this.adminModel.findOne({userName: userName}).exec()
    }

    
    public async findAll(): Promise<any> {
        return this.adminModel.find().exec()
    }

}
