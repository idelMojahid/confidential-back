import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import { DrivingLicenseCategory } from "../driving-license-category/driving-license-category.entity";

@Table({
  timestamps: true,
  tableName: 'driver',
})
export class Driver extends Model<Driver> {
  @Column({ field: 'first_name' })
  firstName: string;
  @Column({ field: 'last_name' })
  lastName: string;
  @Column({ field: 'cin' })
  cin: string;
  @Column({ field: 'date_of_birth' })
  dateOfBirth: Date;
  @Column({ field: 'sex' })
  sex: string;

  @Column({ field: 'driver_license_issue_date' })
  driverLicenseIssueDate: Date;

  @ForeignKey(() => DrivingLicenseCategory)
  @Column({ field: 'driver_license_category_id' })
  driverLicenseCategoryId: Number;

  @Column({ field: 'driver_license_id' })
  driverLicenseId: string;
}
