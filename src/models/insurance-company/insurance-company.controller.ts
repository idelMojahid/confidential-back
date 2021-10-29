import { Controller } from '@nestjs/common';
import { InsuranceCompanyService } from './insurance-company.service';

@Controller('insurance-company')
export class InsuranceCompanyController {
    constructor(
        private readonly insuranceCompanyService: InsuranceCompanyService
      ) {}
}
