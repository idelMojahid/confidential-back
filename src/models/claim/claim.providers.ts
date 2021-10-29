import { Claim } from './claim.entity';

export const claimProviders = [
  {
    provide: 'CLAIMS_REPOSITORY',
    useValue: Claim,
  },
];
