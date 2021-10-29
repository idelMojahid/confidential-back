import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany
} from 'sequelize-typescript';
import { Driver } from '../driver/driver.entity';
import { AuthorityType } from '../authority-type/authority-type.entity';
import { Vehicule } from '../vehicule/vehicule.entity';
import { Victim } from '../victim/victim.entity';
import { JudicialProcedure } from '../judicial-procedure/judicial-procedure.entity';

@Table({
  timestamps: true,
  tableName: 'claim',
})
export class Claim extends Model<Claim> {
  @Column({field: 'policy_number'})
  policyNumber: string;
  @Column({field: 'claim_number'})
  claimNumber: string;
  @Column({field: 'pv_number'})
  pvNumber: string;
  @Column({field: 'loss_location'})
  lossLocation: string;
  @Column({field: 'loss_hour'})
  lossHour: string;
  @Column({field: 'loss_date'})
  lossDate: Date;
  @Column({field: 'authority_name'})
  authorityName: string;
  @Column({field: 'responsibility_share'})
  responsibilityShare: string;
  @Column({field: 'accident_description'})
  accidentDescription: string;
  
  @Column({field: 'created_by'})
  createdBy: string;
  @Column({field: 'updated_by'})
  updatedBy: string;
  @Column
  status: string;
  @Column({field: 'rejection_reason'})
  rejectionReason: string;
  @Column({field: 'decided_by'})
  decidedBy: string;
  @Column({field: 'decided_at'})
  decidedAt: Date;


  @ForeignKey(() => JudicialProcedure)
  @Column({field: 'juidcial_procedure_id'})
  judicialProcedureId: Number;

  @BelongsTo(() => JudicialProcedure)
  judicialProcedure: JudicialProcedure;

  
  @ForeignKey(() => Driver)
  @Column({field: 'driver_id'})
  driverId: Number;

  @BelongsTo(() => Driver)
  driver: Driver;

  @ForeignKey(() => AuthorityType)
  @Column({field: 'authority_type'})
  authorityType: Number;

  @BelongsTo(() => AuthorityType)
  authority: AuthorityType;

  @ForeignKey(() => Vehicule)
  @Column({field: 'vehicule_id'})
  vehiculeId: Number;

  @BelongsTo(() => Vehicule)
  vehicule: Vehicule;
  
  @HasMany(() => Victim)
  victims: Victim[];

}
