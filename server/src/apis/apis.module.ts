import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';
import { ApisController } from './apis.controller';
import { ApisService } from './apis.service';

@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [ApisController],
  providers: [ApisService],
})
export class ApisModule {}