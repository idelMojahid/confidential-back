import { Driver } from './driver.entity';

export const driverProviders = [
  {
    provide: 'DRIVERS_REPOSITORY',
    useValue: Driver,
  },
];
