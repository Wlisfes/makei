import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import * as path from 'path';
import * as session from 'express-session';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.enableCors();  //Cors跨域配置
  app.useGlobalFilters(new HttpExceptionFilter());   //错误捕获
  app.useStaticAssets(path.join(__dirname,`..`, `public`))   //静态资源

  app.use(session({   //session配置
    secret: 'makei-session',  //密钥key
    cookie: {
      httpOnly: true,  //禁止js操作
      maxAge: 60*10*1000,      //有效时间10分钟
    }
  }))

  
  await app.listen(3000);
}
bootstrap();
