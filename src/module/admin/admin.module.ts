import { Module } from '@nestjs/common';
import { AdminController } from './controller/admin.controller';
import { AuthService } from '../auth/service/auth.service'

@Module({
  controllers: [AdminController],
  providers: [AuthService]
})
export class AdminModule {}
