import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot('mongodb://localhost/makei', {
      useNewUrlParser: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

