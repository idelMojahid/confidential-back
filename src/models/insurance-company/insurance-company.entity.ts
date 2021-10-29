import { Table, Column, Model,PrimaryKey } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'insurance_company',
})
export class InsuranceCompany extends Model<InsuranceCompany> {

  @PrimaryKey
  @Column
  code: string;

}
