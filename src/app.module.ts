import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClaimModule } from './models/claim/claim.module';
import { DriverModule } from './models/driver/driver.module';
import { AuthorityTypeModule } from './models/authority-type/authority-type.module';
import { ProcedureModule } from './models/procedure/procedure.module';
import { VehiculeModule } from './models/vehicule/vehicule.module';
import { DocumentModule } from './models/document/document.module';
import { VictimModule } from './models/victim/victim.module';
import { JudicialProcedureModule } from './models/judicial-procedure/judicial-procedure.module';
import { DrivingLicenseCategoryModule } from './models/driving-license-category/driving-license-category.module';
import { CommonModule } from './models/common/common.module';
import { UploadDocumentsModule } from "./upload-documents/upload-documents.module";
import { DamageTypeModule } from './models/damage-type/damage-type.module';
import { WorkAccidentModule } from './models/work-accident/work-accident.module';
import { RejectionReasonModule } from './models/rejection-reason/rejection-reason.module';
import { ClaimRejectionReasonModule } from './models/claim-rejection-reason/claim-rejection-reason.module';
import { InsuranceCompanyModule } from './models/insurance-company/insurance-company.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JudicialProcedureModule,
    ClaimModule,
    DriverModule,
    AuthorityTypeModule,
    ProcedureModule,
    VehiculeModule,
    DocumentModule,
    VictimModule,
    DrivingLicenseCategoryModule,
    CommonModule,
    UploadDocumentsModule,
    DamageTypeModule,
    WorkAccidentModule,
    RejectionReasonModule,
    ClaimRejectionReasonModule,
    InsuranceCompanyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
