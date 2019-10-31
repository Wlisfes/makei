import { Injectable } from '@nestjs/common';
import { Success, Fali } from '../interface/tool.interface'
import * as md5 from 'md5';

@Injectable()
export class ToolService {
    
    
    public success(param: Success) {
        return param;
    }

    public fali(param: Fali) {
        return param;
    }

    public signMD5(v: string) {
        return md5(v)
    }
}
