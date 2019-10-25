import { Module } from '@nestjs/common';
import { CodeController } from './controller/code/code.controller';
import { CodeService } from './service/code/code.service';

@Module({
  controllers: [CodeController],
  providers: [CodeService]
})
export class AuthModule {}
