import { WorkAccident } from './work-accident.entity';

export const workAccidentProviders = [
  {
    provide: 'WORK_ACCIDENT_REPOSITORY',
    useValue: WorkAccident,
  },
];
