import { Controller, Get } from '@nestjs/common';
import { VictimService } from './victim.service';

@Controller('victim')
export class VictimController {
  constructor(private readonly victimService: VictimService) {}

  @Get()
  async getVictims() {
    const victims = await this.victimService.findAll();
    return victims;
  }
}
