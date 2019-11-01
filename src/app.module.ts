//Module  模块
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './module/admin/admin.module';
import { AuthModule } from './module/auth/auth.module';

//Controller 路由控制器
import { AppController } from './app.controller';

//Service  服务
import { AppService } from './app.service';
import { ToolService } from './common/service/tool.service';

//Guard  守卫
import { AuthGuard } from './common/guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';

//interceptor  拦截器
import { FormatInterceptor } from './common/interceptor/format.interceptor'
import { APP_INTERCEPTOR } from '@nestjs/core';

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
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: FormatInterceptor
    }
  ]
})
export class AppModule {}

