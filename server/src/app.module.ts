import { Module } from '@nestjs/common';
import { ApisService } from './apis/apis.service';
import { ApisController } from './apis/apis.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';
import { ApisModule } from './apis/apis.module';

@Module({
  imports: [HttpModule, ApisModule, CacheModule.register()],
  controllers: [ApisController],
  providers: [ApisService],
})
export class AppModule {}
