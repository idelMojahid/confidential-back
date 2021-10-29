import { Test, TestingModule } from '@nestjs/testing';
import { WorkAccidentController } from './work-accident.controller';
import { WorkAccidentService } from './work-accident.service';
import { workAccidentProviders } from './work-accident.providers'

describe('WorkAccident Controller', () => {
  let controller: WorkAccidentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkAccidentController],
      providers: [WorkAccidentService, ...workAccidentProviders],
    }).compile();

    controller = module.get<WorkAccidentController>(WorkAccidentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
