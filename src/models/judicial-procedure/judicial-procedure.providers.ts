import { JudicialProcedure } from './judicial-procedure.entity';

export const judicialProcedureProviders = [
  {
    provide: 'JUDICIAL_PROCEDURE_REPOSITORY',
    useValue: JudicialProcedure,
  },
];
