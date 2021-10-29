import { Injectable, Inject } from '@nestjs/common';
import { Driver } from './driver.entity';
import { Transaction } from 'sequelize/types';
import { DriverType } from './driver.typings';

@Injectable()
export class DriverService {
  constructor(
    @Inject('DRIVERS_REPOSITORY')
    private readonly driversRepository: typeof Driver,
  ) { }
  async findAll(): Promise<Driver[]> {
    return this.driversRepository.findAll<Driver>();
  }
  async insertDriver(driver: DriverType, transaction?: Transaction): Promise<DriverType> {
    return this.driversRepository.create(driver, { transaction });
  }
}
