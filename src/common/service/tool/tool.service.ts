import { Injectable } from '@nestjs/common';
import { success,fail } from '../../interface/tool.interface';
import * as md5 from 'md5';

@Injectable()
export class ToolService {

    getMD5(v: string) {
        return md5(v)
    }

    success(props: success) {
        return props;
    }

    fail(props: fail) {
        return props;
    }
}
