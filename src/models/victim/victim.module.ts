import { Module } from '@nestjs/common';
import { VictimController } from './victim.controller';
import { VictimService } from './victim.service';
import { victimProviders } from './victim.providers';
import { DatabaseModule } from '../../db/db.module';

@Module({
  imports: [DatabaseModule],
  controllers: [VictimController],
  providers: [VictimService, ...victimProviders],
  exports: [VictimService],
})
export class VictimModule {}
