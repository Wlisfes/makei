import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class isId {
    @IsString()
    @IsNotEmpty({
        message: 'id不能为空！'
    })
    @Length(24,24, {
        message: 'id格式不正确！'
    })
    readonly id: string;
}

