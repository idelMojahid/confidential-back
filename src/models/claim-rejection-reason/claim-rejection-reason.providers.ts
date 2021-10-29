import { ClaimRejectionReason } from './claim-rejection-reason.entity';

export const claimRejectionReasonProviders = [
  {
    provide: 'CLAIM_REJECTION_REASONS_REPOSITORY',
    useValue: ClaimRejectionReason,
  },
];
