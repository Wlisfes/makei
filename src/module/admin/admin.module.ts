import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './controller/admin.controller';
import { ToolService } from '../../common/service/tool.service';
import { AdminSchema } from '../../schema/admin.schema';
import { AdminService } from './service/admin.service';
import { AuthModule } from '../auth/auth.module';


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
export class AdminModule {}
