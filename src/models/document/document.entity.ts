import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Claim } from '../claim/claim.entity';

@Table({
  timestamps: true,
  tableName: 'document',
})
export class Document extends Model<Document> {
  @Column
  url: string;
  @Column
  name: string;
  @Column
  type: string;
  @Column({field: 'is_visible'})
  isVisible: Boolean;

  @ForeignKey(() => Claim)
  @Column({field: 'claim_id'})
  claimId: Number;
  @BelongsTo(() => Claim)
  claim: Claim;

  @Column({field: 'indexed_at'})
  indexedAt: Date;
  @Column({field: 'is_indexed'})
  isIndexed: Boolean;
}
