import { Module } from '@nestjs/common';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { driverProviders } from './driver.providers';
import { DatabaseModule } from '../../db/db.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DriverController],
  providers: [DriverService, ...driverProviders],
  exports: [DriverService],
})
export class DriverModule {}
