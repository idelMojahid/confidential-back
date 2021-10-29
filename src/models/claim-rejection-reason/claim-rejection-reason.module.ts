import { Module } from '@nestjs/common';
import { ClaimRejectionReasonController } from './claim-rejection-reason.controller';
import { ClaimRejectionReasonService } from './claim-rejection-reason.service';
import { claimRejectionReasonProviders } from './claim-rejection-reason.providers'
@Module({
  controllers: [ClaimRejectionReasonController],
  providers: [ClaimRejectionReasonService,...claimRejectionReasonProviders],
  exports: [ClaimRejectionReasonService]
})
export class ClaimRejectionReasonModule {}
