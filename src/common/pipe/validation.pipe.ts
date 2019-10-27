import {
  Injectable,
  ArgumentMetadata,
  PipeTransform,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any>{
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object, {
      whitelist: true
    });

    if (errors.length > 0) {
      const errorMeg: string[] = [];
      const Msg: string = Object.values(errors[0].constraints)[0]
      for(const error of errors) {
        for(const type in error.constraints) {
          errorMeg.push(error.constraints[type])
        }
      }
      throw new HttpException(Msg, HttpStatus.BAD_REQUEST)
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
