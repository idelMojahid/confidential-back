import { Module } from '@nestjs/common';
import { RejectionReasonController } from './rejection-reason.controller';
import { RejectionReasonService } from './rejection-reason.service';
import { rejectionReasonProviders } from './rejection-reason.providers';

@Module({
  controllers: [RejectionReasonController],
  providers: [RejectionReasonService, ...rejectionReasonProviders],
  exports: [RejectionReasonService],
})
export class RejectionReasonModule {}
