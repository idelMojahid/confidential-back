import { Module } from '@nestjs/common';
import { ClaimController } from './claim.controller';
import { ClaimService } from './claim.service';
import { claimProviders } from './claim.providers';
import { DatabaseModule } from '../../db/db.module';
import { ClaimRejectionReasonModule } from '../claim-rejection-reason/claim-rejection-reason.module';
import { ClaimRejectionReasonService } from '../claim-rejection-reason/claim-rejection-reason.service';
import { claimRejectionReasonProviders } from '../claim-rejection-reason/claim-rejection-reason.providers';
import { databaseProviders } from 'src/db/db.providers';
@Module({
  imports: [DatabaseModule,ClaimRejectionReasonModule],
  controllers: [ClaimController],
  providers: [ClaimService, ...claimProviders,ClaimRejectionReasonService,...claimRejectionReasonProviders,...databaseProviders],
  exports: [ClaimService],
})
export class ClaimModule {}
