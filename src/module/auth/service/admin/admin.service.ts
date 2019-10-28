import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from '../../../../common/interface/admin.interface';


@Injectable()
export class AdminService {
    constructor(
        @InjectModel('Admin') private readonly adminModel: Model<Admin>
    ){}
    private Keys: `status nickName userName Avatar Email add_time`

    public getmodel() {
        return this.adminModel
    }


    //注册
    public async postRegister(
        AdminData: Admin = {}
    ): Promise<any> {
        const admin = new this.adminModel(AdminData)
        return await admin.save()
    }


    //查询全部
    public async findAll(): Promise<any []> {
        return await this.adminModel.find({},this.Keys).sort({add_time: -1}).exec();
    }


    //修改信息
    public async updateOne(
        condition: Admin,
        updaData: Admin = {}
    ): Promise<any> {
        return await this.adminModel.AdminData.updateOne(condition,updaData).exec()
    }


    //根据id查询单个
    public async findById(id: string): Promise<any> {
        return await this.adminModel.findById(id, this.Keys).exec()
    }


    //删除信息
    public async deleteOne(id: string): Promise<any> {
        return await this.adminModel.deleteOne({_id: id})
    }
}
