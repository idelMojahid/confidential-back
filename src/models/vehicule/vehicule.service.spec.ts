import { Test, TestingModule } from '@nestjs/testing';
import { VehiculeService } from './vehicule.service';
import { vehiculeProviders } from './vehicule.providers';
import { repositoryMockFactory } from '../../../test/mock-factory';
import { VehiculeType } from './vehicule.typings';

describe('VehiculeService', () => {
  let service: VehiculeService;
  let vehiculeRepo: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehiculeService, {provide: 'VEHICULES_REPOSITORY', useFactory: repositoryMockFactory}, ...vehiculeProviders],
    }).compile();

    service = module.get<VehiculeService>(VehiculeService);
    vehiculeRepo = module.get('VEHICULES_REPOSITORY');

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return all stored vehicule', async () => {
      const vehicule: VehiculeType = {
        brand: 'fake-brand',
        registrationNumber: 'fake-registration-number',
        opposingParty: 'fake-opp-party',
      };

      jest.spyOn(vehiculeRepo, 'findAll').mockResolvedValueOnce(vehicule);

      const response = await service.findAll();

      expect(vehiculeRepo.findAll).toHaveBeenCalled;
      expect(response).toBe(vehicule);
    });
  });

  describe('insertVehicule', () => {
    it('should insert victim', async () => {
      const vehicule: VehiculeType = {
        brand: 'fake-brand',
        registrationNumber: 'fake-registration-number',
        opposingParty: 'fake-opp-party',
      };

      jest.spyOn(vehiculeRepo, 'create').mockResolvedValueOnce(['vehicule-created']);

      const response = await service.insertVehicule(vehicule);

      expect(vehiculeRepo.create).toHaveBeenCalled;
      expect(response).toEqual(['vehicule-created']);
    });
  });
});
