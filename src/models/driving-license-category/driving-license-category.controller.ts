import { Controller, Get } from "@nestjs/common";
import { DrivingLicenseCategoryService } from "./driving-license-category.service";

@Controller("driving-license-category")
export class DrivingLicenseCategoryController {
  constructor(
    private readonly drivingLicenseCategoryService: DrivingLicenseCategoryService
  ) {}

  @Get()
  async getProcedures() {
    const drivingLicenseCategories = await this.drivingLicenseCategoryService.findAll();
    return drivingLicenseCategories;
  }
}
