import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'judicial_procedure',
})
export class JudicialProcedure extends Model<JudicialProcedure> {
  @Column
  title: string;
  @Column({field: "is_visible"})
  isVisible: Boolean;
}
