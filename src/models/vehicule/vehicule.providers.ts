import { Vehicule } from './vehicule.entity';

export const vehiculeProviders = [
  {
    provide: 'VEHICULES_REPOSITORY',
    useValue: Vehicule,
  },
];
