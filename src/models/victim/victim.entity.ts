import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Claim } from '../claim/claim.entity';
import { Procedure } from '../procedure/procedure.entity';
import { WorkAccident } from '../work-accident/work-accident.entity';

@Table({
  timestamps: true,
  tableName: 'victim',
})
export class Victim extends Model<Victim> {
  @Column
  cin: string;
  @Column({field: 'first_name'})
  firstName: string;
  @Column({field: 'last_name'})
  lastName: string;
  @Column({field: 'telephone_number'})
  telephoneNumber: string;
  @ForeignKey(() => Procedure)
  @Column({field: 'procedure_id'})
  procedureId: Number;
  @Column({field: 'damage_type'})
  damageType: string;
  @Column
  profession: string;
  @ForeignKey(() => WorkAccident)
  @Column({field: 'work_accident_id'})
  workAccidentId: Number;  @Column
  itt: string;
  @Column
  city: string;
  @Column
  address: string;
  @Column({field: 'is_excluded'})
  isExcluded: Boolean;
  @ForeignKey(() => Claim)
  @Column({field: 'claim_id'})
  claimId: Number;
  @BelongsTo(() => Claim)
  claim: Claim;
}
