import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FormatInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        return {
          data: data.data || '',
          code: data.code || HttpStatus.OK,
          message: data.message || 'ok'
        }
      })
    )
  }

  public format(data) {
    const props = {}

  }
}
