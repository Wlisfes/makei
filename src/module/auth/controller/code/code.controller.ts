import { Controller, Get, Response, Request } from '@nestjs/common';
import { CodeService } from '../../service/code/code.service';

@Controller('api/auth/code')
export class CodeController {
    constructor(
        private readonly codeService: CodeService
    ) {}

    @Get()
    getCode(@Request() req,@Response() res) {
        const captcha = this.codeService.getCaptcha()
        
        req.session.code = captcha.text
        res.setHeader('Content-Type', 'image/svg+xml')
        res.write(String(captcha.data));
        res.end();
    }
}
