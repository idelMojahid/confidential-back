import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'procedure',
})
export class Procedure extends Model<Procedure> {
  @Column
  title: string;
  @Column({field: "is_visible"})
  isVisible: Boolean;
}
