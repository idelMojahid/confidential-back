import { Procedure } from './procedure.entity';

export const procedureProviders = [
  {
    provide: 'PROCEDURE_REPOSITORY',
    useValue: Procedure,
  },
];
