import { Test, TestingModule } from '@nestjs/testing';
import { RejectionReasonService } from './rejection-reason.service';
import { rejectionReasonProviders } from './rejection-reason.providers';
import { repositoryMockFactory } from '../../../test/mock-factory';
import { RejectionReasonType } from './rejection-reason.typings';

describe('RejectionReasonService', () => {
  let service: RejectionReasonService;
  let rejectionReasonRepo: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RejectionReasonService,{ provide: 'REJECTION_REASONS_REPOSITORY', useFactory: repositoryMockFactory }, ...rejectionReasonProviders],
    }).compile();

    service = module.get<RejectionReasonService>(RejectionReasonService);
    rejectionReasonRepo =  module.get('REJECTION_REASONS_REPOSITORY');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findAll', () => {
    it('should return all damage types', async () => {
      const rejectionReason: RejectionReasonType = {
        title: 'fake-damage-type',
        isVisible:true
      };

      jest.spyOn(rejectionReasonRepo, 'findAll').mockResolvedValueOnce(rejectionReason);

      const response = await service.findAll();

      expect(rejectionReasonRepo.findAll).toHaveBeenCalled;
      expect(response).toBe(rejectionReason);
    });
  });
});
