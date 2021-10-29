import { Injectable, Inject } from '@nestjs/common';
import { Victim } from './victim.entity';
import { VictimType } from './victim.typings';

import { Transaction } from 'sequelize/types';

@Injectable()
export class VictimService {
  constructor(
    @Inject('VICTIMS_REPOSITORY')
    private readonly victimRepository: typeof Victim,
  ) {}
  async findAll(): Promise<Victim[]> {
    return this.victimRepository.findAll<Victim>();
  }
  async insertVictim(victims: VictimType[], transaction?: Transaction): Promise<VictimType[]> {
    return this.victimRepository.bulkCreate(victims, {transaction});
  }
}
