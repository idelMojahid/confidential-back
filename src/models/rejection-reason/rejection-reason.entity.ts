import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'rejection_reason',
})
export class RejectionReason extends Model<RejectionReason> {
  @Column
  title: string;
  @Column({field: "is_visible"})
  isVisible: Boolean;
}
