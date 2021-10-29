import { Test, TestingModule } from "@nestjs/testing";
import { DrivingLicenseCategoryService } from "./driving-license-category.service";
import { drivingLicenseCategoryProviders } from "./driving-license-category.providers";

describe("DrivingLicenseCategoryService", () => {
  let service: DrivingLicenseCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrivingLicenseCategoryService, ...drivingLicenseCategoryProviders],
    }).compile();

    service = module.get<DrivingLicenseCategoryService>(
      DrivingLicenseCategoryService
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
