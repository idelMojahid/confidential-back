import { Controller, Get } from '@nestjs/common';
import { ProcedureService } from './procedure.service';

@Controller('procedure')
export class ProcedureController {
  constructor(private readonly procedureService: ProcedureService) {}

  @Get()
  async getProcedures() {
    const procedures = await this.procedureService.findAll();
    return procedures;
  }
}
