import { Test, TestingModule } from '@nestjs/testing';
import { InsuranceCompanyController } from './insurance-company.controller';
import { InsuranceCompanyService } from './insurance-company.service';
import { insuranceCompanyProviders } from './insurance-company.providers';

describe('InsuranceCompany Controller', () => {
  let controller: InsuranceCompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InsuranceCompanyController],
      providers: [InsuranceCompanyService,...insuranceCompanyProviders]
    }).compile();

    controller = module.get<InsuranceCompanyController>(InsuranceCompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
