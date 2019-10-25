import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class CodeService {
    //动态验证码
    getCaptcha() {
        const Captcha = svgCaptcha.create({
            size: 4,
            width: 120,
            height: 32,
            fontSize: 36,
            noise: 1,
            background: '#EECCCC',
            inverse: true
        })
        return Captcha;
    }
}
