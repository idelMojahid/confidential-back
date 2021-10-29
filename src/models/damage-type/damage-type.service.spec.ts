import { Test, TestingModule } from '@nestjs/testing';
import { DamageTypeService } from './damage-type.service';
import { damageTypesProviders } from './damage-type.providers';
import { repositoryMockFactory } from '../../../test/mock-factory';
import { DamageTypeType } from './damage-type.typings';

describe('DamageTypeService', () => {
  let service: DamageTypeService;
  let damageTypeRepo: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DamageTypeService,{ provide: 'DAMAGE_TYPES_REPOSITORY', useFactory: repositoryMockFactory },...damageTypesProviders],
    }).compile();

    service = module.get<DamageTypeService>(DamageTypeService);
    damageTypeRepo = module.get('DAMAGE_TYPES_REPOSITORY');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findAll', () => {
    it('should return all damage types', async () => {
      const damageType: DamageTypeType = {
        title: 'fake-damage-type',
        isVisible:true
      };

      jest.spyOn(damageTypeRepo, 'findAll').mockResolvedValueOnce(damageType);

      const response = await service.findAll();

      expect(damageTypeRepo.findAll).toHaveBeenCalled;
      expect(response).toBe(damageType);
    });
  });
});
