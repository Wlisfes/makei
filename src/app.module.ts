//Module
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './module/admin/admin.module';
import { AuthModule } from './module/auth/auth.module';

//Controller
import { AppController } from './app.controller';

//Service
import { AppService } from './app.service';
import { ToolService } from './common/service/tool.service';

//Guard
import { AuthGuard } from './common/guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    MongooseModule.forRoot('mongodb://120.25.123.165/makei', { useNewUrlParser: true })
],
  controllers: [AppController],
  providers: [
    AppService,
    ToolService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}

