import { Test, TestingModule } from '@nestjs/testing';
import { WorkAccidentService } from './work-accident.service';
import { workAccidentProviders } from './work-accident.providers'
import { repositoryMockFactory } from '../../../test/mock-factory';
import { WorkAccidentType } from './work-accident.typings';

describe('WorkAccidentService', () => {
  let service: WorkAccidentService;
  let workAccidentRepo: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkAccidentService,{ provide: 'WORK_ACCIDENT_REPOSITORY', useFactory: repositoryMockFactory }, ...workAccidentProviders],
    }).compile();

    service = module.get<WorkAccidentService>(WorkAccidentService);
    workAccidentRepo = module.get('WORK_ACCIDENT_REPOSITORY');
  });
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all stored work accident', async () => {
      const workAccident: WorkAccidentType = {
        title: 'fake-policy-number',
        isVisible:true
      };

      jest.spyOn(workAccidentRepo, 'findAll').mockResolvedValueOnce(workAccident);

      const response = await service.findAll();

      expect(workAccidentRepo.findAll).toHaveBeenCalled;
      expect(response).toBe(workAccident);
    });
  });
});
