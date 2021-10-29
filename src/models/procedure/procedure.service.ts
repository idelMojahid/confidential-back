import { Injectable, Inject } from '@nestjs/common';
import { Procedure } from './procedure.entity';

@Injectable()
export class ProcedureService {
  constructor(
    @Inject('PROCEDURE_REPOSITORY')
    private readonly procedureRepository: typeof Procedure,
  ) {}
  async findAll(): Promise<Procedure[]> {
    return this.procedureRepository.findAll<Procedure>();
  }
}
