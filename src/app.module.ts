import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './module/admin/admin.module';

@Module({
  imports: [
    AdminModule,
    MongooseModule.forRoot('mongodb://120.25.123.165/makei')
],
  controllers: [AppController],
  providers: [
    AppService
  ]
})
export class AppModule {}

