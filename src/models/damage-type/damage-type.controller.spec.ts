import { Test, TestingModule } from '@nestjs/testing';
import { DamageTypeController } from './damage-type.controller';
import { DamageTypeService } from './damage-type.service';
import { damageTypesProviders } from './damage-type.providers';

describe('DamageType Controller', () => {
  let controller: DamageTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DamageTypeController],
      providers: [DamageTypeService,...damageTypesProviders],
    }).compile();

    controller = module.get<DamageTypeController>(DamageTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
