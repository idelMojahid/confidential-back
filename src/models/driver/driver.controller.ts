import { Controller, Get } from '@nestjs/common';
import { DriverService } from './driver.service';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
  async getDrivers() {
    const drivers = await this.driverService.findAll();
    return drivers;
  }
}
