import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from '../../../../interface/admin.interface';


@Injectable()
export class AdminService {
    constructor(
        @InjectModel('Admin') private readonly adminModel: Model<Admin>
    ){}

    async postRegister(
        AdminData: Admin = {}
    ): Promise<Admin> {
        const admin = new this.adminModel(AdminData)
        return await admin.save()
    }

    async findAll(
        AdminData: Admin = {}
    ): Promise<Admin []> {
        return await this.adminModel.find(AdminData).exec();
    }

    async findOne(
        AdminData: Admin = {}
    ): Promise<Admin> {
        return await this.adminModel.findOne(AdminData).exec();
    }
}
