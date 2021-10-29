import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'driving_license_category',
})
export class DrivingLicenseCategory extends Model<DrivingLicenseCategory> {
  @Column
  title: string;
  @Column({field: "is_visible"})
  isVisible: Boolean;
}
