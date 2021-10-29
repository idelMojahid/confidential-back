import { Test, TestingModule } from '@nestjs/testing';
import { InsuranceCompanyService } from './insurance-company.service';
import { insuranceCompanyProviders } from './insurance-company.providers';
import { repositoryMockFactory } from '../../../test/mock-factory';
import { InsuranceCompanyType } from './insurance-company.typings';


describe('InsuranceCompanyService', () => {
  let service: InsuranceCompanyService;
  let insuranceCompanyRepo: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InsuranceCompanyService,{ provide: 'INSURANCE_COMPANY_REPOSITORY', useFactory: repositoryMockFactory },...insuranceCompanyProviders],
    }).compile();

    service = module.get<InsuranceCompanyService>(InsuranceCompanyService);
    insuranceCompanyRepo = module.get('INSURANCE_COMPANY_REPOSITORY');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findAll', () => {
    it('should return all insurance companies codes', async () => {
      const insuranceCompany: InsuranceCompanyType = {
        code: 'fake-code',
      };

      jest.spyOn(insuranceCompanyRepo, 'findAll').mockResolvedValueOnce(insuranceCompany);

      const response = await service.findAll();

      expect(insuranceCompanyRepo.findAll).toHaveBeenCalled;
      expect(response).toBe(insuranceCompany);
    });
  });
});
