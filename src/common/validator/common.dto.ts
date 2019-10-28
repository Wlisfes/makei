import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class isId {
    @IsString()
    @IsNotEmpty({})
    @Length(24,24, {
        message: 'id错误！'
    })
    readonly id: string;
}

