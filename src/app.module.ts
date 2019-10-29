import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { AdminModule } from './module/admin/admin.module';

@Module({
  imports: [


  AuthModule,


  AdminModule],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}

