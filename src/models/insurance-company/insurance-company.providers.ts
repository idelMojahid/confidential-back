import { InsuranceCompany } from './insurance-company.entity';

export const insuranceCompanyProviders = [
  {
    provide: 'INSURANCE_COMPANY_REPOSITORY',
    useValue: InsuranceCompany,
  },
];
