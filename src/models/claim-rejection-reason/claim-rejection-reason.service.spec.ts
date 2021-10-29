import { Test, TestingModule } from '@nestjs/testing';
import { ClaimRejectionReasonService } from './claim-rejection-reason.service';
import { claimRejectionReasonProviders } from './claim-rejection-reason.providers';
import { repositoryMockFactory } from '../../../test/mock-factory';

describe('ClaimRejectionReasonService', () => {
  let service: ClaimRejectionReasonService;
  let claimRejectionReasonRepo: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClaimRejectionReasonService,{ provide: 'CLAIM_REJECTION_REASONS_REPOSITORY', useFactory: repositoryMockFactory }, ...claimRejectionReasonProviders],

    }).compile();

    service = module.get<ClaimRejectionReasonService>(ClaimRejectionReasonService);
    claimRejectionReasonRepo = module.get('CLAIM_REJECTION_REASONS_REPOSITORY');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('insertClaim', () => {
    it('should insert claim whti rejections reasons', async () => {
      const claimId = 1;
      const rejectionReasonIds = [1,2];
      const mappedClaimRejection = [{"claimId": 1, "rejectionReasonId": 1}, {"claimId": 1, "rejectionReasonId": 2}];
      jest.spyOn(claimRejectionReasonRepo, 'bulkCreate').mockResolvedValueOnce(['claim-rejected']);

      const response = await service.insertClaimRejectionReasons(claimId,rejectionReasonIds);

      expect(claimRejectionReasonRepo.bulkCreate).toHaveBeenCalledWith(mappedClaimRejection,{"transaction": undefined});
      expect(response).toEqual(['claim-rejected']);
    });
  });
});
