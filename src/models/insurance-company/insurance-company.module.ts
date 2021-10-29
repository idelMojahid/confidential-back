import { Module } from '@nestjs/common';
import { InsuranceCompanyController } from './insurance-company.controller';
import { InsuranceCompanyService } from './insurance-company.service';
import { insuranceCompanyProviders } from './insurance-company.providers';

@Module({
  controllers: [InsuranceCompanyController],
  providers: [InsuranceCompanyService,...insuranceCompanyProviders],
  exports: [InsuranceCompanyService]
})
export class InsuranceCompanyModule {}
