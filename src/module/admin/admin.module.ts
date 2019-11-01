import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './controller/admin.controller';
import { ToolService } from '../../common/service/tool.service';
import { AdminSchema } from '../../schema/admin.schema';
import { AdminService } from './service/admin.service';
import { AuthModule } from '../auth/auth.module';

import { AuthMiddleware } from '../../common/middleware/auth.middleware';


@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'Admin', schema: AdminSchema }
    ])
  ],
  controllers: [AdminController],
  providers: [ AdminService,ToolService]
})

export class AdminModule implements NestModule{
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/api/admin/info', method: RequestMethod.GET },
        // { path: '/api/admin/findAll', method: RequestMethod.GET }
      )
  }
}
