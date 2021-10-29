import { Test, TestingModule } from '@nestjs/testing';
import { AuthorityTypeService } from './authority-type.service';
import { authorityTypesProviders } from './authority-type.providers';

describe('AuthorityTypeService', () => {
  let service: AuthorityTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorityTypeService, ...authorityTypesProviders],
    }).compile();

    service = module.get<AuthorityTypeService>(AuthorityTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
