import { Injectable, Inject } from '@nestjs/common';
import { JudicialProcedure } from './judicial-procedure.entity';

@Injectable()
export class JudicialProcedureService {
  constructor(
    @Inject('JUDICIAL_PROCEDURE_REPOSITORY')
    private readonly judicialProcedureRepository: typeof JudicialProcedure,
  ) {}
  async findAll(): Promise<JudicialProcedure[]> {
    return this.judicialProcedureRepository.findAll<JudicialProcedure>();
  }
}
