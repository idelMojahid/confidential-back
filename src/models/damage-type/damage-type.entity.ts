import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'damage_type',
})
export class DamageType extends Model<DamageType> {
  @Column
  title: string;
  @Column({field: "is_visible"})
  isVisible: Boolean;
}
