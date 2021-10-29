import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'work_accident',
})
export class WorkAccident extends Model<WorkAccident> {
  @Column
  title: string;
  @Column({field: "is_visible"})
  isVisible: Boolean;
}
