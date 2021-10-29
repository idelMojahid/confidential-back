import { Injectable, Inject } from '@nestjs/common';
import { ClaimRejectionReason } from './claim-rejection-reason.entity';
import { Transaction } from 'sequelize/types';

@Injectable()
export class ClaimRejectionReasonService {
  constructor(
    @Inject('CLAIM_REJECTION_REASONS_REPOSITORY')
    private readonly claimRejectionReasonRepository: typeof ClaimRejectionReason) {}

    async insertClaimRejectionReasons(claimId: number,rejectionReasonIds: number[], transaction?: Transaction): Promise<{}> {
        const claimRejectionReasons = rejectionReasonIds.map((rejectionReasonId)=>{
            return {claimId,rejectionReasonId:rejectionReasonId}
        })
        return this.claimRejectionReasonRepository.bulkCreate(claimRejectionReasons, {transaction});
    }
 
}
