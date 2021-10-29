import { Test, TestingModule } from '@nestjs/testing';
import { AuthorityTypeController } from './authority-type.controller';
import { AuthorityTypeService } from './authority-type.service';
import { authorityTypesProviders } from './authority-type.providers';

describe('AuthorityType Controller', () => {
  let controller: AuthorityTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorityTypeController],
      providers: [AuthorityTypeService, ...authorityTypesProviders],
    }).compile();

    controller = module.get<AuthorityTypeController>(AuthorityTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
