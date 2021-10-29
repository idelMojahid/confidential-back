import { Table, Column, Model } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'vehicule',
})
export class Vehicule extends Model<Vehicule> {
  @Column
  brand: string;
  @Column({field: 'registration_number'})
  registrationNumber: string;
  @Column({field: 'opposing_party'})
  opposingParty: string;
}
