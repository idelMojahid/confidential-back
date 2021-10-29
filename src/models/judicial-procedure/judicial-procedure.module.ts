import { Module } from '@nestjs/common';
import { JudicialProcedureController } from './judicial-procedure.controller';
import { JudicialProcedureService } from './judicial-procedure.service';
import { judicialProcedureProviders } from './judicial-procedure.providers';
import { DatabaseModule } from '../../db/db.module';

@Module({
  imports: [DatabaseModule],
  controllers: [JudicialProcedureController],
  providers: [JudicialProcedureService, ...judicialProcedureProviders],
  exports: [JudicialProcedureService],
})
export class JudicialProcedureModule {}
