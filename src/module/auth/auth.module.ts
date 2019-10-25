import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CodeController } from './controller/code/code.controller';
import { CodeService } from './service/code/code.service';
import { AdminService } from './service/admin/admin.service';
import { AdminController } from './controller/admin/admin.controller';


//schema
import { AdminSchema } from '../../schema/admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Admin', schema: AdminSchema }
    ])
  ],
  controllers: [CodeController, AdminController],
  providers: [CodeService, AdminService]
})
export class AuthModule {}
