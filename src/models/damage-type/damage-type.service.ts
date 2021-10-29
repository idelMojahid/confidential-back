import { Injectable, Inject } from '@nestjs/common';
import { DamageType } from './damage-type.entity';

@Injectable()
export class DamageTypeService {
  constructor(
    @Inject('DAMAGE_TYPES_REPOSITORY')
    private readonly damageTypeRepository: typeof DamageType) {}
  
    async findAll(): Promise<DamageType[]> {
      return this.damageTypeRepository.findAll<DamageType>();
    }
 
}
