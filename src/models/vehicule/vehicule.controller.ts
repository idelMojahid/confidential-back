import { Controller, Get } from '@nestjs/common';
import { VehiculeService } from './vehicule.service';

@Controller('vehicule')
export class VehiculeController {
  constructor(private readonly vehiculeService: VehiculeService) {}

  @Get()
  async getVehicules() {
    const vehicules = await this.vehiculeService.findAll();
    return vehicules;
  }
}
