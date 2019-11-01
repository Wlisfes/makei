import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../../module/auth/service/auth.service';
import * as moment from 'moment';


@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService
  ) { }
  async use(req: any, res: any, next: () => void) {
    try {
      const token = req.headers['authorization']
      if(!token) {
        res.status(HttpStatus.UNAUTHORIZED).json({
          code: HttpStatus.UNAUTHORIZED,
          message: 'token错误！',
          timestamp: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          path: req.url,
          method: req.method
        })
      }
      else {
        const Auth = await this.authService.verifyToken(token)
        const One = await this.authService.findOne(Auth.uid)
        console.log(One)
        if(One.access_token === token) {
          next()
        }
        else {
          res.status(HttpStatus.UNAUTHORIZED).json({
            code: HttpStatus.UNAUTHORIZED,
            message: 'token已过期！',
            timestamp: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            path: req.url,
            method: req.method
          })
        }
      }
    } catch (error) {
      res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        message: 'token已过期！',
        timestamp: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        path: req.url,
        method: req.method
      })
    }
  }
}
