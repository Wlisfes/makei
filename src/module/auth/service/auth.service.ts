import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    private secret: string;
    constructor() {
        this.secret = 'jwtlisfes'
    }

    async signToken(uid: string, name: string): Promise<string> {
        const token:string = jwt.sign({uid, name}, this.secret, {
            expiresIn: 60
        })
        return token;
    }

    async verifyToken(token: string): Promise<any> {
        const info = jwt.verify(token, this.secret)
        return info
    }
}
