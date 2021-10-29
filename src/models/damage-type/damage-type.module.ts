import { Module } from '@nestjs/common';
import { DamageTypeController } from './damage-type.controller';
import { DamageTypeService } from './damage-type.service';
import { damageTypesProviders } from './damage-type.providers';

@Module({
  controllers: [DamageTypeController],
  providers: [DamageTypeService,...damageTypesProviders],
  exports: [DamageTypeService]
})
export class DamageTypeModule {}
