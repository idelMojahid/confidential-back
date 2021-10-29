import { Test, TestingModule } from '@nestjs/testing';
import { VehiculeController } from './vehicule.controller';
import { VehiculeService } from './vehicule.service';
import { vehiculeProviders } from './vehicule.providers';

describe('Vehicule Controller', () => {
  let controller: VehiculeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiculeController],
      providers: [VehiculeService, ...vehiculeProviders],
    }).compile();

    controller = module.get<VehiculeController>(VehiculeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
