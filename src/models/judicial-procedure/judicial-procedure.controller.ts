import { Controller, Get } from '@nestjs/common';
import { JudicialProcedureService } from './judicial-procedure.service';

@Controller('judicial-procedure')
export class JudicialProcedureController {
  constructor(
    private readonly judicialProcedureService: JudicialProcedureService,
  ) {}

  @Get()
  async getjudicialProcedures() {
    const judicialProcedures = await this.judicialProcedureService.findAll();
    return judicialProcedures;
  }
}
