import { Test, TestingModule } from '@nestjs/testing';
import { VictimService } from './victim.service';
import { victimProviders } from './victim.providers';
import { repositoryMockFactory } from '../../../test/mock-factory';
import { VictimType } from './victim.typings';

describe('VictimService', () => {
  let service: VictimService;
  let victimRepo: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VictimService, {provide: 'VICTIMS_REPOSITORY', useFactory: repositoryMockFactory}, ...victimProviders],
    }).compile();

    service = module.get<VictimService>(VictimService);
    victimRepo = module.get('VICTIMS_REPOSITORY');
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all stored claim', async () => {
      const victims: VictimType[] = [{
        id: 1,
        firstName: 'fake-first-name',
        lastName: 'fake-last-name',
        cin: 'fake-cin',
        telephoneNumber: 'fake-phone-num',
        procedureId: 98,
        damageType: 'fake-damage-type',
        profession: 'fake-profession',
        workAccidentId: 1,
        itt: 'itt',
        city: 'city',
        address: 'address',
        isExcluded: false,
        claimId: 45,
      }];

      jest.spyOn(victimRepo, 'findAll').mockResolvedValueOnce(victims);

      const response = await service.findAll();

      expect(victimRepo.findAll).toHaveBeenCalled;
      expect(response).toBe(victims);
    });
  });

  describe('insertVictim', () => {
    it('should insert victim', async () => {
      const victims: VictimType[] = [{
        firstName: 'fake-first-name',
        lastName: 'fake-last-name',
        cin: 'fake-cin',
        telephoneNumber: 'fake-phone-num',
        procedureId: 98,
        damageType: 'fake-damage-type',
        profession: 'fake-profession',
        workAccidentId: 1,
        itt: 'itt',
        city: 'city',
        address: 'address',
        isExcluded: false,
        claimId: 45,
      }];

      jest.spyOn(victimRepo, 'bulkCreate').mockResolvedValueOnce(['victims-created']);

      const response = await service.insertVictim(victims);

      expect(victimRepo.bulkCreate).toHaveBeenCalled;
      expect(response).toEqual(['victims-created']);
    });
  });
});
