import { Injectable } from '@nestjs/common';
import { Success, Fali } from '../interface/tool.interface'

@Injectable()
export class ToolService {
    
    
    public success(param: Success) {
        return param;
    }

    public fali(param: Fali) {
        return param;
    }
}
