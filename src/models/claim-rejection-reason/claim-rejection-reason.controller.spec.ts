import { Test, TestingModule } from '@nestjs/testing';
import { ClaimRejectionReasonController } from './claim-rejection-reason.controller';
import { claimRejectionReasonProviders } from './claim-rejection-reason.providers';
import { ClaimRejectionReasonService } from './claim-rejection-reason.service';

describe('ClaimRejectionReason Controller', () => {
  let controller: ClaimRejectionReasonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClaimRejectionReasonController],
      providers: [ClaimRejectionReasonService,...claimRejectionReasonProviders]
    }).compile();

    controller = module.get<ClaimRejectionReasonController>(ClaimRejectionReasonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
