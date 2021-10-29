import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'authority_type',
})
export class AuthorityType extends Model<AuthorityType> {
  @Column
  title: string;
  @Column({field: "is_visible"})
  isVisible: Boolean;
}
