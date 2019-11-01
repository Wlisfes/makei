import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DecryptAuth, Auth } from '../../../common/interface/auth.interface';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    private secret: string;
    constructor(
        @InjectModel('Auth') private readonly authModel: Model
    ) {
        this.secret = 'jwtlisfes'
    }


    /**
     * 加密
     * @param uid 
     * @param name 
     */
    public async signToken(uid: string, name: string): Promise<string> {
        const One = await this.findOne(uid)
        const token:string = jwt.sign({uid, name}, this.secret, {
            expiresIn: 60*60*2
        })
        if(One) {
            await this.update(uid, token)
            return token;
        }
        else {
            await this.create(uid, token)
            return token;
        }
    }


    /**
     * 解密
     * @param token 
     */
    public async verifyToken(token: string): Promise<DecryptAuth> {
        const info = jwt.verify(token, this.secret)
        return info
    }


    /**
     * 查询token
     * @param uid 
     */
    public async findOne(uid: string): Promise<Auth> {
        return await this.authModel.findOne({uid}, `uid access_token`).exec()
    }


    /**
     * 更新token
     * @param uid 
     * @param token 
     */
    public async update(uid: string, token: string): Promise<any> {
        return this.authModel.update({uid}, {access_token: token})
    }


    /**
     * 写入token
     * @param uid 
     * @param token 
     */
    public async create(uid: string, token: string): Promise<any> {
        const Auth = new this.authModel({
            uid: uid,
            access_token: token
        })
        return await Auth.save()
    }


    /**
     * 删除token
     * @param uid 
     */
    public async remove(uid: string): Promise<any> {
        return this.authModel.remove({uid})
    }
}
