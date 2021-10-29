import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Claim } from '../claim/claim.entity';
import { RejectionReason } from '../rejection-reason/rejection-reason.entity';

@Table({
  timestamps: true,
  tableName: 'claim_rejection_reason',
})
export class ClaimRejectionReason extends Model<ClaimRejectionReason> {
  @ForeignKey(() => Claim)
  @Column({field: 'claim_id'})
  claimId: number;

  @ForeignKey(() => RejectionReason)
  @Column({field: 'rejection_reason_id'})
  rejectionReasonId: number;
}
