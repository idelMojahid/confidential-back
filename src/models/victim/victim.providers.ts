import { Victim } from './victim.entity';

export const victimProviders = [
  {
    provide: 'VICTIMS_REPOSITORY',
    useValue: Victim,
  },
];
