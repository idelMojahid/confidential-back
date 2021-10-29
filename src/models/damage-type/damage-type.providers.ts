import { DamageType } from './damage-type.entity';

export const damageTypesProviders = [
  {
    provide: 'DAMAGE_TYPES_REPOSITORY',
    useValue: DamageType,
  },
];
