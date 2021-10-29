import { Test, TestingModule } from '@nestjs/testing';
import { JudicialProcedureController } from './judicial-procedure.controller';
import { JudicialProcedureService } from './judicial-procedure.service';
import { judicialProcedureProviders } from './judicial-procedure.providers';

describe('JudicialProcedure Controller', () => {
  let controller: JudicialProcedureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JudicialProcedureController],
      providers: [JudicialProcedureService, ...judicialProcedureProviders],
    }).compile();

    controller = module.get<JudicialProcedureController>(
      JudicialProcedureController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
