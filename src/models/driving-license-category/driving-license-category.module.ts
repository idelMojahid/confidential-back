import { Module } from "@nestjs/common";
import { DrivingLicenseCategoryController } from "./driving-license-category.controller";
import { DrivingLicenseCategoryService } from "./driving-license-category.service";
import { drivingLicenseCategoryProviders } from "./driving-license-category.providers";

@Module({
  controllers: [DrivingLicenseCategoryController],
  providers: [DrivingLicenseCategoryService, ...drivingLicenseCategoryProviders],
  exports: [DrivingLicenseCategoryService],
})
export class DrivingLicenseCategoryModule {}
