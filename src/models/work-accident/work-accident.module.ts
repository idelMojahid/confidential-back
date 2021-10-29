import { Module } from '@nestjs/common';
import { WorkAccidentController } from './work-accident.controller';
import { WorkAccidentService } from './work-accident.service';
import { workAccidentProviders } from './work-accident.providers';

@Module({
  controllers: [WorkAccidentController],
  providers: [WorkAccidentService,...workAccidentProviders],
  exports: [WorkAccidentService],
})
export class WorkAccidentModule {}
