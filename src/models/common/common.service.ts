import { Injectable, Inject } from '@nestjs/common';
import { Transaction, Op } from 'sequelize';
import * as _ from 'lodash';

import { ProcedureService } from '../procedure/procedure.service';
import { JudicialProcedureService } from '../judicial-procedure/judicial-procedure.service';
import { AuthorityTypeService } from '../authority-type/authority-type.service';
import { DrivingLicenseCategoryService } from '../driving-license-category/driving-license-category.service';

import { Listings, ClaimDossier } from './common.typings';
import { ClaimService } from '../claim/claim.service';
import { DriverService } from '../driver/driver.service';
import { DocumentService } from '../document/document.service';
import { VictimService } from '../victim/victim.service';
import { VehiculeService } from '../vehicule/vehicule.service';
import { DamageTypeService } from '../damage-type/damage-type.service';
import { WorkAccidentService } from '../work-accident/work-accident.service';
import { DriverType } from '../driver/driver.typings';
import { VehiculeType } from '../vehicule/vehicule.typings';
import { Vehicule as VehiculeEntity } from '../vehicule/vehicule.entity';
import { Driver as DriverEntity } from '../driver/driver.entity';
import { Victim as VictimEntity } from '../victim/victim.entity';
import { CLAIMS_STATUS } from '../../constants'
import { RejectionReasonService } from '../rejection-reason/rejection-reason.service';
import { ClaimType } from '../claim/claim.typings';
import { VictimType } from '../victim/victim.typings';
import { DocumentType } from '../document/document.typings';
import { InsuranceCompanyService } from '../insurance-company/insurance-company.service';

@Injectable()
export class CommonService {
   constructor(
      @Inject('SEQUELIZE') private readonly sequelize,
      private readonly procedureService: ProcedureService,
      private readonly judicialProcedureService: JudicialProcedureService,
      private readonly authorityTypeService: AuthorityTypeService,
      private readonly drivingLicensesCategoriesService: DrivingLicenseCategoryService,
      private readonly claimService: ClaimService,
      private readonly driverService: DriverService,
      private readonly documentService: DocumentService,
      private readonly victimService: VictimService,
      private readonly vehiculeService: VehiculeService,
      private readonly workAccidentService: WorkAccidentService,
      private readonly damageTypeService: DamageTypeService,
      private readonly rejectionReasonService: RejectionReasonService,
      private readonly insuranceCompanyService: InsuranceCompanyService,

   ) { }

   async getListings(): Promise<Listings> {
      const procedures = await this.procedureService.findAll();
      const judicialProcedures = await this.judicialProcedureService.findAll();
      const authorityTypes = await this.authorityTypeService.findAll();
      const drivingLicenseCategories = await this.drivingLicensesCategoriesService.findAll();
      const workAccidents = await this.workAccidentService.findAll();
      const damageTypes = await this.damageTypeService.findAll();
      const rejectionReasons = await this.rejectionReasonService.findAll();
      let insuranceCompanies = await this.insuranceCompanyService.findAll();
      return { procedures, judicialProcedures, authorityTypes, drivingLicenseCategories, workAccidents, damageTypes, rejectionReasons, insuranceCompanies };
   }

   async preOpenClaim(claimToPreOpen: ClaimDossier): Promise<{}> {
      let createdDriver;
      let createdVehicule;
      let createdClaim;

      const { claim, driver, documents, victims, vehicule } = claimToPreOpen;

      try {
         return await this.sequelize.transaction(async (transaction: Transaction) => {

            if (!_.isEmpty(driver)) {
               createdDriver = await this.driverService.insertDriver(driver as DriverType, transaction);
            }
            if (!_.isEmpty(vehicule)) {
               createdVehicule = await this.vehiculeService.insertVehicule(vehicule as VehiculeType, transaction);
            }

            const claimToInsert = {
               ...claim, driverId: _.get(createdDriver, ['dataValues', 'id'], null),
               vehiculeId: _.get(createdVehicule, ['dataValues', 'id'], null),
            };

            createdClaim = await this.claimService.insertClaim(claimToInsert as ClaimType, transaction);

            const claimId = _.get(createdClaim, ['dataValues', 'id'], null);

            const createdDocuments = documents.map(d => ({ ...d, claimId }));

            await this.documentService.insertDocument(createdDocuments as DocumentType[], transaction);

            const createdVictims = victims.map(v => ({ ...v, claimId }));

            return await this.victimService.insertVictim(createdVictims as VictimType[], transaction);
         });
      } catch (error) {
         throw error;
      }
   }

   async findClaimsWhere(policyNumber: string | undefined, registrationNumber: string | undefined, lossDate: string) {
      if (policyNumber)
         return await this.claimService.findAllWhen({
            where: { [Op.and]: [this.sequelize.where(this.sequelize.fn('date', this.sequelize.col('loss_date')), '=', lossDate), { policyNumber }] }
            , include: [
               {
                  model: VehiculeEntity,
               },
               {
                  model: DriverEntity,
               }
            ]
         })

      return await this.claimService.findAllWhen({
         where: this.sequelize.where(this.sequelize.fn('date', this.sequelize.col('loss_date')), '=', lossDate)
         , include: [
            {
               model: VehiculeEntity,
               where: { registrationNumber }
            },
            {
               model: DriverEntity,
            }
         ]
      })
   }

   async findClaimsStatsLimit(count: Number) {
      const pendinClaims = await this.claimService.findAllWhen({ limit: count, order: ['createdAt'], where: { status: CLAIMS_STATUS.PENDING }, include: [DriverEntity, VictimEntity] });
      const pendinClaimsCount = await this.claimService.countWhen({ where: { status: CLAIMS_STATUS.PENDING } });
      const validatedClaims = await this.claimService.findAllWhen({ limit: count, order: ['createdAt'], where: { status: CLAIMS_STATUS.VALIDATED }, include: [DriverEntity, VictimEntity] });
      const validatedClaimsCount = await this.claimService.countWhen({ where: { status: CLAIMS_STATUS.VALIDATED } });
      const claimsPendingValidated = {
         pending: {
            total: pendinClaimsCount,
            claims: pendinClaims
         },
         validated: {
            total: validatedClaimsCount,
            claims: validatedClaims
         }
      };
      return claimsPendingValidated;
   }

   async getClaimsByStatus(status : string, page: number, pageSize: number, name: string){
      const offset = page * pageSize;
      const claims =  await this.claimService.findAllWhen( {limit: pageSize, offset, order:['createdAt'], where:{status :status, createdBy: name}, include:[DriverEntity,VictimEntity]});
      const claimsCount = await this.claimService.countWhen({where:{status :status, createdBy: name}});
      return {
         total : claimsCount,
         claims,
      };
   }

   async geLatestClaimsByStatus(status : string, count: Number){
      const claims =  await this.claimService.findAllWhen( {limit: count, order:['createdAt'], where:{status :status}, include:[DriverEntity,VictimEntity]});
      const claimsCount = await this.claimService.countWhen({where:{status :status }});
      return {
         total :claimsCount,
         claims,
      };
   }

}
