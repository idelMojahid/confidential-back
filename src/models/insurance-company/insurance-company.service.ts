import { Injectable,Inject } from '@nestjs/common';
import { InsuranceCompany } from './insurance-company.entity';

@Injectable()
export class InsuranceCompanyService {
    constructor(
        @Inject('INSURANCE_COMPANY_REPOSITORY')
        private readonly insuranceCompanyRepository: typeof InsuranceCompany,
      ) {}
    async findAll(): Promise<InsuranceCompany[]> {
    return this.insuranceCompanyRepository.findAll<InsuranceCompany>();
    }
}
