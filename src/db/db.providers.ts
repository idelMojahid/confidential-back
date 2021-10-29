import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './db.config';
import { Claim } from '../models/claim/claim.entity';
import { Driver } from '../models/driver/driver.entity';
import { AuthorityType } from '../models/authority-type/authority-type.entity';
import { Procedure } from '../models/procedure/procedure.entity';
import { Vehicule } from '../models/vehicule/vehicule.entity';
import { Document } from '../models/document/document.entity';
import { Victim } from '../models/victim/victim.entity';
import { JudicialProcedure } from '../models/judicial-procedure/judicial-procedure.entity';
import { DrivingLicenseCategory } from '../models/driving-license-category/driving-license-category.entity';
import { DamageType } from '../models/damage-type/damage-type.entity';
import { WorkAccident } from '../models/work-accident/work-accident.entity';
import { RejectionReason } from '../models/rejection-reason/rejection-reason.entity';
import { ClaimRejectionReason } from '../models/claim-rejection-reason/claim-rejection-reason.entity';
import { InsuranceCompany } from '../models/insurance-company/insurance-company.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(databaseConfig);
      sequelize.addModels([
        Claim,
        Driver,
        AuthorityType,
        JudicialProcedure,
        Procedure,
        Vehicule,
        Document,
        Victim,
        DrivingLicenseCategory,
        DamageType,
        WorkAccident,
        RejectionReason,
        ClaimRejectionReason,
        InsuranceCompany
      ]);
      return sequelize;
    },
  },
];
