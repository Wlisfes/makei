import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

//注册验证
export class RegisterDto {
    @IsString()
    @IsNotEmpty({
        message: 'nickName不能为空！'
    })
    readonly nickName: string;

    @IsString()
    @IsNotEmpty({
        message: 'userName不能为空！'
    })
    readonly userName: string;

    @IsString()
    @IsNotEmpty({
        message: 'password不能为空！'
    })
    readonly password: string;

    @IsEmail()
    @IsNotEmpty({
        message: 'Email不能为空！'
    })
    readonly Email: string;
}


//登录验证
export class LoginDto {
    @IsString()
    @IsNotEmpty({
        message: 'userName不能为空！'
    })
    readonly userName: string;

    @IsString()
    @IsNotEmpty({
        message: 'password不能为空！'
    })
    readonly password: string;
}


//更新验证
export class UpdateDto {
    @IsString()
    @IsNotEmpty({
        message: 'id不能为空！'
    })
    @Length(24,24, {
        message: 'id格式不正确！'
    })
    readonly id: string;
    nickName?: String;
    userName?: String;
    password?: String;
    Avatar?: String;
    Email?: String;
    status?: String;
}
