import { DrivingLicenseCategory } from './driving-license-category.entity';

export const drivingLicenseCategoryProviders = [
  {
    provide: 'DRIVING_LICENSE_REPOSITORY',
    useValue: DrivingLicenseCategory,
  },
];
