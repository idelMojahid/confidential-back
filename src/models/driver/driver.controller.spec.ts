import { Test, TestingModule } from '@nestjs/testing';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { driverProviders } from './driver.providers';

describe('Driver Controller', () => {
  let controller: DriverController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriverController],
      providers: [DriverService, ...driverProviders],
    }).compile();

    controller = module.get<DriverController>(DriverController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
