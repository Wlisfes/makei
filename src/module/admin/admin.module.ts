import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './controller/admin.controller';
import { AuthService } from '../auth/service/auth.service';
import { AdminSchema } from '../../schema/admin.schema';
import { AdminService } from './service/admin.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Admin', schema: AdminSchema }
    ])
  ],
  controllers: [AdminController],
  providers: [AuthService, AdminService]
})
export class AdminModule {}
