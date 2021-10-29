import { Test, TestingModule } from '@nestjs/testing';
import { RejectionReasonController } from './rejection-reason.controller';
import { RejectionReasonService } from './rejection-reason.service';
import { rejectionReasonProviders } from './rejection-reason.providers';

describe('RejectionReason Controller', () => {
  let controller: RejectionReasonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RejectionReasonController],
      providers: [RejectionReasonService, ...rejectionReasonProviders],

    }).compile();

    controller = module.get<RejectionReasonController>(RejectionReasonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
