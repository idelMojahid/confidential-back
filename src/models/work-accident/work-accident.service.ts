import { Injectable, Inject } from '@nestjs/common';
import { WorkAccident } from './work-accident.entity';

@Injectable()
export class WorkAccidentService {
  constructor(
    @Inject('WORK_ACCIDENT_REPOSITORY')
    private readonly workAccidentRepository: typeof WorkAccident,
  ) {}
  async findAll(): Promise<WorkAccident[]> {
    return this.workAccidentRepository.findAll<WorkAccident>();
  }

}
