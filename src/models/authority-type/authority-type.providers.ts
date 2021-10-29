import { AuthorityType } from './authority-type.entity';

export const authorityTypesProviders = [
  {
    provide: 'AUTHORITY_TYPES_REPOSITORY',
    useValue: AuthorityType,
  },
];
