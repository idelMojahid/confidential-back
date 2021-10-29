import { Test, TestingModule } from '@nestjs/testing';
import { JudicialProcedureService } from './judicial-procedure.service';
import { judicialProcedureProviders } from './judicial-procedure.providers';

describe('JudicialProcedureService', () => {
  let service: JudicialProcedureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JudicialProcedureService, ...judicialProcedureProviders],
    }).compile();

    service = module.get<JudicialProcedureService>(JudicialProcedureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
