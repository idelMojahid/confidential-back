import { Module } from '@nestjs/common';
import { VehiculeController } from './vehicule.controller';
import { VehiculeService } from './vehicule.service';
import { vehiculeProviders } from './vehicule.providers';
import { DatabaseModule } from '../../db/db.module';

@Module({
  imports: [DatabaseModule],
  controllers: [VehiculeController],
  providers: [VehiculeService, ...vehiculeProviders],
  exports: [VehiculeService],
})
export class VehiculeModule {}
