import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from '../../schema/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Auth', schema: AuthSchema }
    ])
  ],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
