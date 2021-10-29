import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { AuthorityTypeModule } from '../authority-type/authority-type.module';
import { ProcedureModule } from '../procedure/procedure.module';
import { JudicialProcedureModule } from '../judicial-procedure/judicial-procedure.module';
import { DrivingLicenseCategoryModule } from '../driving-license-category/driving-license-category.module';
import { ClaimModule } from '../claim/claim.module';
import { DriverModule } from '../driver/driver.module';
import { DocumentModule } from '../document/document.module';
import { VictimModule } from '../victim/victim.module';
import { DatabaseModule } from '../../db/db.module';
import { VehiculeModule } from '../vehicule/vehicule.module';
import { WorkAccidentModule } from '../work-accident/work-accident.module';
import { DamageTypeModule } from '../damage-type/damage-type.module';
import { RejectionReasonModule } from '../rejection-reason/rejection-reason.module';
import { ClaimRejectionReasonModule } from '../claim-rejection-reason/claim-rejection-reason.module';
import { InsuranceCompanyModule } from '../insurance-company/insurance-company.module';

@Module({
  controllers: [CommonController],
  providers: [CommonService],
  imports: [AuthorityTypeModule, ProcedureModule, JudicialProcedureModule, DrivingLicenseCategoryModule,
    ClaimModule, DriverModule, DocumentModule, VictimModule, VehiculeModule,WorkAccidentModule, DamageTypeModule ,RejectionReasonModule,
    ClaimRejectionReasonModule, InsuranceCompanyModule, DatabaseModule ],
})
export class CommonModule {}
