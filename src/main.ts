import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  //catch
  app.useGlobalFilters(new HttpExceptionFilter());

  //Cors
  app.enableCors();

  //静态资源
  app.useStaticAssets(join(__dirname,`..`, `public`))

  
  await app.listen(3000);
}
bootstrap();
