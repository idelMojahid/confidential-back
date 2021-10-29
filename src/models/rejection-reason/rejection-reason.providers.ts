import { RejectionReason } from './rejection-reason.entity';

export const rejectionReasonProviders = [
  {
    provide: 'REJECTION_REASONS_REPOSITORY',
    useValue: RejectionReason,
  },
];
