import { Module } from '@nestjs/common';
import { ProcedureController } from './procedure.controller';
import { ProcedureService } from './procedure.service';
import { procedureProviders } from './procedure.providers';
import { DatabaseModule } from '../../db/db.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProcedureController],
  providers: [ProcedureService, ...procedureProviders],
  exports: [ProcedureService],
})
export class ProcedureModule {}
