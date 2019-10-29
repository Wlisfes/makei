import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);



  //Cors
  app.enableCors();

  //静态资源
  app.useStaticAssets(join(__dirname,`..`, `public`))

  
  await app.listen(3000);
}
bootstrap();
