import { Test, TestingModule } from "@nestjs/testing";
import { DrivingLicenseCategoryController } from "./driving-license-category.controller";
import { drivingLicenseCategoryProviders } from "./driving-license-category.providers";
import { DrivingLicenseCategoryService } from "./driving-license-category.service";

describe("DrivingLicenseCategory Controller", () => {
  let controller: DrivingLicenseCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrivingLicenseCategoryController],
      providers: [DrivingLicenseCategoryService, ...drivingLicenseCategoryProviders],
    }).compile();

    controller = module.get<DrivingLicenseCategoryController>(
      DrivingLicenseCategoryController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
