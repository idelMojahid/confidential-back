import { Test, TestingModule } from '@nestjs/testing';
import { ProcedureService } from './procedure.service';
import { procedureProviders } from './procedure.providers';

describe('ProcedureService', () => {
  let service: ProcedureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProcedureService, ...procedureProviders],
    }).compile();

    service = module.get<ProcedureService>(ProcedureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
