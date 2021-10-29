import { Test, TestingModule } from '@nestjs/testing';
import { ProcedureController } from './procedure.controller';
import { ProcedureService } from './procedure.service';
import { procedureProviders } from './procedure.providers';

describe('Procedure Controller', () => {
  let controller: ProcedureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcedureController],
      providers: [ProcedureService, ...procedureProviders],
    }).compile();

    controller = module.get<ProcedureController>(ProcedureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
