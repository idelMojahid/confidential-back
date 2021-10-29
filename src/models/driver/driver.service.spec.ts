import { Test, TestingModule } from '@nestjs/testing';
import { DriverService } from './driver.service';
import { driverProviders } from './driver.providers';
import { repositoryMockFactory } from '../../../test/mock-factory';
import { DriverType } from './driver.typings';

describe('DriverService', () => {
  let service: DriverService;
  let driverRepo: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DriverService, { provide: 'DRIVERS_REPOSITORY', useFactory: repositoryMockFactory }, ...driverProviders],
    }).compile();

    service = module.get<DriverService>(DriverService);
    driverRepo = module.get('DRIVERS_REPOSITORY');
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
      const driver: DriverType = {
        id: 1,
        firstName: 'fake-first-name',
        lastName: 'fake-last-name',
        cin: 'fake-cin',
        dateOfBirth: new Date('1955-02-01'),
        sex: 'M',
        driverLicenseIssueDate: new Date('2020-02-01'),
        driverLicenseCategoryId: 2,
        driverLicenseId: 'fake-id',
      };

      jest.spyOn(driverRepo, 'findAll').mockResolvedValueOnce(driver);

      const response = await service.findAll();

      expect(driverRepo.findAll).toHaveBeenCalled;
      expect(response).toBe(driver);
    });
  });

  describe('insertDriver', () => {
    it('should insert driver', async () => {
      const driver: DriverType = {
        id: 1,
        firstName: 'fake-first-name',
        lastName: 'fake-last-name',
        cin: 'fake-cin',
        dateOfBirth: new Date('1955-02-01'),
        sex: 'M',
        driverLicenseIssueDate: new Date('2020-02-01'),
        driverLicenseCategoryId: 2,
        driverLicenseId: 'fake-id',
      };

      jest.spyOn(driverRepo, 'create').mockResolvedValueOnce(['driver-created']);

      const response = await service.insertDriver(driver);

      expect(driverRepo.create).toHaveBeenCalled;
      expect(response).toEqual(['driver-created']);
    });
  });
});
