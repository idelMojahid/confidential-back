import { Injectable, Inject } from '@nestjs/common';
import { Vehicule } from './vehicule.entity';
import { Transaction } from 'sequelize/types';
import { VehiculeType } from './vehicule.typings';

@Injectable()
export class VehiculeService {
  constructor(
    @Inject('VEHICULES_REPOSITORY')
    private readonly vehiculeRepository: typeof Vehicule,
  ) {}
  async findAll(): Promise<Vehicule[]> {
    return this.vehiculeRepository.findAll<Vehicule>();
  }
  async insertVehicule(vehicule: VehiculeType, transaction?: Transaction): Promise<VehiculeType> {
    return this.vehiculeRepository.create(vehicule, {transaction});
  }
}
