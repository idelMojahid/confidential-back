import { Injectable, Inject } from "@nestjs/common";
import { DrivingLicenseCategory } from "./driving-license-category.entity";

@Injectable()
export class DrivingLicenseCategoryService {
    constructor(
        @Inject('DRIVING_LICENSE_REPOSITORY')
        private readonly drivingLicenseCategoryRepository: typeof DrivingLicenseCategory,
      ) {}
      async findAll(): Promise<DrivingLicenseCategory[]> {
        return this.drivingLicenseCategoryRepository.findAll<DrivingLicenseCategory>();
      }
}
