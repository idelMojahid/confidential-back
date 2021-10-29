import { Test, TestingModule } from '@nestjs/testing';
import { CommonService } from './common.service';
import { procedureProviders } from '../procedure/procedure.providers';
import { ProcedureService } from '../procedure/procedure.service';
import { authorityTypesProviders } from '../authority-type/authority-type.providers';
import { AuthorityTypeService } from '../authority-type/authority-type.service';
import { judicialProcedureProviders } from '../judicial-procedure/judicial-procedure.providers';
import { JudicialProcedureService } from '../judicial-procedure/judicial-procedure.service';
import { DrivingLicenseCategoryService } from '../driving-license-category/driving-license-category.service';
import { drivingLicenseCategoryProviders } from '../driving-license-category/driving-license-category.providers';
import { ClaimService } from '../claim/claim.service';
import { claimProviders } from '../claim/claim.providers';
import { VictimService } from '../victim/victim.service';
import { victimProviders } from '../victim/victim.providers';
import { VehiculeService } from '../vehicule/vehicule.service';
import { vehiculeProviders } from '../vehicule/vehicule.providers';
import { DocumentService } from '../document/document.service';
import { documentsProviders } from '../document/document.providers';
import { databaseProviders } from '../../db/db.providers';
import { DriverService } from '../driver/driver.service';
import { driverProviders } from '../driver/driver.providers';
import { Claim } from '../claim/claim.entity';
import { workAccidentProviders } from '../work-accident/work-accident.providers';
import { WorkAccidentService } from '../work-accident/work-accident.service';
import { DamageTypeService } from '../damage-type/damage-type.service';
import { damageTypesProviders } from '../damage-type/damage-type.providers';
import { RejectionReasonService } from '../rejection-reason/rejection-reason.service';
import { rejectionReasonProviders } from '../rejection-reason/rejection-reason.providers';
import { ClaimRejectionReasonService } from '../claim-rejection-reason/claim-rejection-reason.service';
import { claimRejectionReasonProviders } from '../claim-rejection-reason/claim-rejection-reason.providers';
import { InsuranceCompanyService } from '../insurance-company/insurance-company.service';
import { insuranceCompanyProviders } from '../insurance-company/insurance-company.providers';

describe('CommonService', () => {
  let service: CommonService;
  let procedureService: ProcedureService;
  let judicialProcedureService: JudicialProcedureService;
  let authorityTypeService: AuthorityTypeService;
  let drivingLicenseCategoryService: DrivingLicenseCategoryService;
  let claimService: ClaimService;
  let driverService: DriverService;
  let vehiculeService: VehiculeService;
  let victimService: VictimService;
  let documentService: DocumentService;
  let workAccidentService: WorkAccidentService;
  let damageTypeService: DamageTypeService;
  let rejectionReasonService: RejectionReasonService;
  let claimRejectionReasonService: ClaimRejectionReasonService;
  let insuranceCompanyService: InsuranceCompanyService;
  let dbRepo: any;

  beforeAll(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonService, ProcedureService, ...procedureProviders, AuthorityTypeService, ...authorityTypesProviders,
        JudicialProcedureService, ...judicialProcedureProviders, DrivingLicenseCategoryService, ...drivingLicenseCategoryProviders,
        ClaimService, ...claimProviders, VictimService, ...victimProviders, VehiculeService, ...vehiculeProviders,
        DocumentService, ...documentsProviders, ...databaseProviders, DriverService, ...driverProviders,WorkAccidentService,...workAccidentProviders,
        DamageTypeService,...damageTypesProviders,RejectionReasonService,...rejectionReasonProviders,ClaimRejectionReasonService,...claimRejectionReasonProviders,
        InsuranceCompanyService,...insuranceCompanyProviders
      ],
    }).compile();

    service = module.get<CommonService>(CommonService);
    procedureService = module.get<ProcedureService>(ProcedureService);
    judicialProcedureService = module.get<JudicialProcedureService>(JudicialProcedureService);
    authorityTypeService = module.get<AuthorityTypeService>(AuthorityTypeService);
    drivingLicenseCategoryService = module.get<DrivingLicenseCategoryService>(DrivingLicenseCategoryService);
    driverService = module.get<DriverService>(DriverService);
    vehiculeService = module.get<VehiculeService>(VehiculeService);
    claimService = module.get<ClaimService>(ClaimService);
    documentService = module.get<DocumentService>(DocumentService);
    workAccidentService = module.get<WorkAccidentService>(WorkAccidentService);
    damageTypeService = module.get<DamageTypeService>(DamageTypeService);
    victimService = module.get<VictimService>(VictimService);
    rejectionReasonService = module.get<RejectionReasonService>(RejectionReasonService);
    claimRejectionReasonService = module.get<ClaimRejectionReasonService>(ClaimRejectionReasonService);
    insuranceCompanyService = module.get<InsuranceCompanyService>(InsuranceCompanyService);
    dbRepo = module.get('SEQUELIZE');
  });

  describe('getListings', () => {
    it('should return listings of procedures, judicial procedures and authority types', async () => {
      jest.spyOn(procedureService, 'findAll').mockImplementation((): any => Promise.resolve([{ id: 'fake-id', title: 'fake-procedure', isVisible: true }]));
      jest.spyOn(judicialProcedureService, 'findAll').mockImplementation((): any => Promise.resolve([{ id: 'fake-id', title: 'fake-judicial-procedure', isVisible: true }]));
      jest.spyOn(authorityTypeService, 'findAll').mockImplementation((): any => Promise.resolve([{ id: 'fake-id', title: 'fake-authority-type', isVisible: true }]));
      jest.spyOn(drivingLicenseCategoryService, 'findAll').mockImplementation((): any => Promise.resolve([{ id: 'fake-id', title: 'fake-driving-license-category', isVisible: true }]));
      jest.spyOn(workAccidentService, 'findAll').mockImplementation((): any => Promise.resolve([{ id: 'fake-id', title: 'fake-work-accident', isVisible: true }]));
      jest.spyOn(damageTypeService, 'findAll').mockImplementation((): any => Promise.resolve([{ id: 'fake-id', title: 'fake-damage-type', isVisible: true }]));
      jest.spyOn(rejectionReasonService, 'findAll').mockImplementation((): any => Promise.resolve([{ id: 'fake-id', title: 'fake-rejection-reason', isVisible: true }]));
      jest.spyOn(insuranceCompanyService, 'findAll').mockImplementation((): any => Promise.resolve(['fake-code-1','fake-code-2']));

      const response = await service.getListings();

      expect(response).toEqual({
        authorityTypes: [{ id: 'fake-id', isVisible: true, title: 'fake-authority-type' }],
        judicialProcedures: [{ id: 'fake-id', isVisible: true, title: 'fake-judicial-procedure' }],
        procedures: [{ id: 'fake-id', isVisible: true, title: 'fake-procedure' }], drivingLicenseCategories: [{ id: 'fake-id', title: 'fake-driving-license-category', isVisible: true }],
        workAccidents:[{ id: 'fake-id', title: 'fake-work-accident', isVisible: true }],damageTypes:[{ id: 'fake-id', title: 'fake-damage-type', isVisible: true }],
        rejectionReasons:[{ id: 'fake-id', title: 'fake-rejection-reason', isVisible: true }],
        insuranceCompanies:['fake-code-1','fake-code-2']
      });
      expect(procedureService.findAll).toHaveBeenCalledTimes(1);
      expect(judicialProcedureService.findAll).toHaveBeenCalledTimes(1);
      expect(authorityTypeService.findAll).toHaveBeenCalledTimes(1);
      expect(drivingLicenseCategoryService.findAll).toHaveBeenCalledTimes(1);
      expect(workAccidentService.findAll).toHaveBeenCalledTimes(1);
      expect(damageTypeService.findAll).toHaveBeenCalledTimes(1);
      expect(rejectionReasonService.findAll).toHaveBeenCalledTimes(1);
      expect(insuranceCompanyService.findAll).toHaveBeenCalledTimes(1);
    });
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  afterAll(() => {
    dbRepo.close();
  });

  describe('preOpenClaim', () => {
    it('should start Transaction, not call driverService.insertDriver and vehiculeService.insertVehicule when not defined', async () => {
      jest.spyOn(claimService, 'insertClaim').mockImplementation((): any => Promise.resolve({ dataValues: { id: 3 } }));
      jest.spyOn(driverService, 'insertDriver').mockImplementation((): any => Promise.resolve({}));
      jest.spyOn(vehiculeService, 'insertVehicule').mockImplementation((): any => Promise.resolve({}));
      jest.spyOn(documentService, 'insertDocument').mockImplementation((): any => Promise.resolve({}));
      jest.spyOn(victimService, 'insertVictim').mockImplementation((): any => Promise.resolve({}));

      const claimToPreOpen = {
        claim: {
          policyNumber: 'fake-policy-number',
          claimNumber: 'fake-claim-number',
          pvNumber: 'fake-pv-number',
          lossLocation: 'fake-location',
          lossHour: '09:00',
          lossDate: new Date('2020-01-01'),
          authorityName: 'fake-name',
          responsibilityShare: '90',
          accidentDescription: 'description',
          judicialProcedureId: 1,
          createdBy: 'username',
          updatedBy: 'username-1',
          status: 'fake-status',
          decidedBy: 'username',
          decidedAt: new Date('2020-01-01'),
          authorityType: 2,
          rejectionReason: 'fake-rejection-reason',
          driverId: null,
          vehiculeId: null,
        },
        driver: {},
        victims: [{
          firstName: 'fake-first-name',
          lastName: 'fake-last-name',
          cin: 'fake-cin',
          telephoneNumber: 'fake-phone-num',
          sex: 'M',
          procedureId: 2,
          damageType: 'fake-damage-type',
          profession: 'fake-profession',
          workAccidentId: 1,
          itt: 'itt',
          city: 'city',
          address: 'address',
          isExcluded: false,
          claimId: 3,
        }],
        documents: [{
          url: 'fake-url',
          name: 'fake-name',
          type: 'fake-type',
          isVisible: true,
          indexedAt: new Date('2020-02-01'),
          isIndexed: true,
          claimId: 3,
        }],
        vehicule: {},
      };
      await service.preOpenClaim(claimToPreOpen);
      expect(driverService.insertDriver).not.toHaveBeenCalled();
      expect(vehiculeService.insertVehicule).not.toHaveBeenCalled();
      expect(claimService.insertClaim).toHaveBeenCalledTimes(1);
      expect(documentService.insertDocument).toHaveBeenCalledTimes(1);
      expect(victimService.insertVictim).toHaveBeenCalledTimes(1);

      expect(claimService.insertClaim).toHaveBeenCalledWith({ ...claimToPreOpen.claim, driverId: null, vehiculeId: null }, expect.any(Object));
      expect(documentService.insertDocument).toHaveBeenCalledWith([
        {
          url: 'fake-url',
          name: 'fake-name',
          type: 'fake-type',
          isVisible: true,
          indexedAt: new Date('2020-02-01'),
          isIndexed: true,
          claimId: 3,
        },
      ], expect.any(Object));
      expect(victimService.insertVictim).toHaveBeenCalledWith(claimToPreOpen.victims, expect.any(Object));
    });

    it('should start Transaction, call both driverService.insertDriver and vehiculeService.insertVehicule when defined', async () => {
      jest.spyOn(claimService, 'insertClaim').mockImplementation((): any => Promise.resolve({ dataValues: { id: 3 } }));
      jest.spyOn(driverService, 'insertDriver').mockImplementation((): any => Promise.resolve({ dataValues: { id: 6 } }));
      jest.spyOn(vehiculeService, 'insertVehicule').mockImplementation((): any => Promise.resolve({ dataValues: { id: 9 } }));
      jest.spyOn(documentService, 'insertDocument').mockImplementation((): any => Promise.resolve({}));
      jest.spyOn(victimService, 'insertVictim').mockImplementation((): any => Promise.resolve({}));

      const claimToPreOpen = {
        claim: {
          policyNumber: 'fake-policy-number',
          claimNumber: 'fake-claim-number',
          pvNumber: 'fake-pv-number',
          lossLocation: 'fake-location',
          lossHour: '09:00',
          lossDate: new Date('2020-01-01'),
          authorityName: 'fake-name',
          responsibilityShare: '90',
          accidentDescription: 'description',
          judicialProcedureId: 1,
          createdBy: 'username',
          updatedBy: 'username-1',
          status: 'fake-status',
          decidedBy: 'username',
          decidedAt: new Date('2020-01-01'),
          authorityType: 2,
          rejectionReason: 'fake-rejection-reason',
          driverId: null,
          vehiculeId: null,
        },
        driver: {
          firstName: 'fake-first-name',
          lastName: 'fake-last-name',
          cin: 'fake-cin',
          dateOfBirth: new Date('1955-02-01'),
          sex: 'M',
          driverLicenseIssueDate: new Date('2020-02-01'),
          driverLicenseCategory: 'fake-category',
          driverLicenseId: 'fake-id',
        },
        victims: [{
          firstName: 'fake-first-name',
          lastName: 'fake-last-name',
          cin: 'fake-cin',
          telephoneNumber: 'fake-phone-num',
          sex: 'M',
          procedureId: 2,
          damageType: 'fake-damage-type',
          profession: 'fake-profession',
          workAccidentId: 1,
          itt: 'itt',
          city: 'city',
          address: 'address',
          isExcluded: false,
          claimId: 3,
        }],
        documents: [{
          url: 'fake-url',
          name: 'fake-name',
          type: 'fake-type',
          isVisible: true,
          indexedAt: new Date('2020-02-02'),
          isIndexed: true,
          claimId: 3,
        }],
        vehicule: {
          brand: 'fake-brand',
          registrationNumber: 'fake-reg-num',
          opposingParty: 'fake-op-party',
        },
      };
      await service.preOpenClaim(claimToPreOpen);
      expect(driverService.insertDriver).toHaveBeenCalledTimes(1);
      expect(vehiculeService.insertVehicule).toHaveBeenCalledTimes(1);
      expect(claimService.insertClaim).toHaveBeenCalledTimes(1);
      expect(documentService.insertDocument).toHaveBeenCalledTimes(1);
      expect(victimService.insertVictim).toHaveBeenCalledTimes(1);

      expect(claimService.insertClaim).toHaveBeenCalledWith({ ...claimToPreOpen.claim, driverId: 6, vehiculeId: 9 }, expect.any(Object));
      expect(documentService.insertDocument).toHaveBeenCalledWith(claimToPreOpen.documents, expect.any(Object));
      expect(victimService.insertVictim).toHaveBeenCalledWith(claimToPreOpen.victims, expect.any(Object));
    });
  });
  describe('findClaimsWhere', () => {
    it('should return claims', async () => {
      const result = [
        {
          "id": 1,
          "policyNumber": "5555",
          "claimNumber": "1",
          "pvNumber": "1",
          "lossLocation": "1",
          "lossHour": "1",
          "lossDate": "1778-05-18T00:00:00.000Z",
          "authorityName": "7HHH",
          "responsibilityShare": "LKK",
          "accidentDescription": "sldks",
          "judicialProcedureId": 1,
          "createdBy": "yoo",
          "updatedBy": "miii",
          "status": "in",
          "rejectionReason": "sxksokdsokc",
          "decidedBy": "lskxos",
          "decidedAt": "1999-12-15T00:00:00.000Z",
          "driverId": 3,
          "authorityType": 1,
          "vehiculeId": 1,
          "createdAt": null,
          "updatedAt": null,
          "vehicule": {
            "id": 1,
            "brand": "yy",
            "registrationNumber": "566",
            "opposingParty": "YYY",
            "createdAt": null,
            "updatedAt": null
          },
          "driver": {
            "id": 3,
            "firstName": "yomi",
            "lastName": "yami",
            "cin": "bb",
            "dateOfBirth": "1777-08-08T00:00:00.000Z",
            "sex": "autre",
            "driverLicenseIssueDate": "1888-03-03T00:00:00.000Z",
            "driverLicenseCategory": 1,
            "driverLicenseId": "1",
            "createdAt": null,
            "updatedAt": null
          }
        }
      ]
      jest.spyOn(claimService, 'findAllWhen').mockImplementation((): any => Promise.resolve(result));
      const Claims = await service.findClaimsWhere(null,'test','12/12/2012')
      expect(claimService.findAllWhen).toHaveBeenCalled();
      expect(Claims).toEqual(result)
    })
  })

  describe('findClaimsStatsLimit', () => {
    it('should return PENDING & VALIDATED claims', async () => {
      const count = 4;
      const result = [
        {
          "id": 1,
          "policyNumber": "5555",
          "claimNumber": "1",
          "pvNumber": "1",
          "lossLocation": "1",
          "lossHour": "1",
          "lossDate": "1778-05-18T00:00:00.000Z",
          "authorityName": "7HHH",
          "responsibilityShare": "LKK",
          "accidentDescription": "sldks",
          "judicialProcedureId": 1,
          "createdBy": "yoo",
          "updatedBy": "miii",
          "status": "in",
          "rejectionReason": "sxksokdsokc",
          "decidedBy": "lskxos",
          "decidedAt": "1999-12-15T00:00:00.000Z",
          "driverId": 3,
          "authorityType": 1,
          "vehiculeId": 1,
          "createdAt": null,
          "updatedAt": null,
          "vehicule": {
            "id": 1,
            "brand": "yy",
            "registrationNumber": "566",
            "opposingParty": "YYY",
            "createdAt": null,
            "updatedAt": null
          },
          "driver": {
            "id": 3,
            "firstName": "yomi",
            "lastName": "yami",
            "cin": "bb",
            "dateOfBirth": "1777-08-08T00:00:00.000Z",
            "sex": "autre",
            "driverLicenseIssueDate": "1888-03-03T00:00:00.000Z",
            "driverLicenseCategory": 1,
            "driverLicenseId": "1",
            "createdAt": null,
            "updatedAt": null
          }
        }
      ]
      const countClaims = 10 ;
      jest.spyOn(claimService, 'findAllWhen').mockImplementation((): any => Promise.resolve(result));
      jest.spyOn(claimService, 'countWhen').mockImplementation((): any => countClaims);

      const claims = await service.findClaimsStatsLimit(count)
      expect(claimService.findAllWhen).toHaveBeenCalledTimes(2);
      const resultFindClaimsStatsLimit = {
        "pending": {
            "claims": [
                {
                    "accidentDescription": "sldks",
                    "authorityName": "7HHH",
                    "authorityType": 1,
                    "claimNumber": "1",
                    "createdAt": null,
                    "createdBy": "yoo",
                    "decidedAt": "1999-12-15T00:00:00.000Z",
                    "decidedBy": "lskxos",
                    "driver": {
                        "cin": "bb",
                        "createdAt": null,
                        "dateOfBirth": "1777-08-08T00:00:00.000Z",
                        "driverLicenseCategory": 1,
                        "driverLicenseId": "1",
                        "driverLicenseIssueDate": "1888-03-03T00:00:00.000Z",
                        "firstName": "yomi",
                        "id": 3,
                        "lastName": "yami",
                        "sex": "autre",
                        "updatedAt": null
                    },
                    "driverId": 3,
                    "id": 1,
                    "judicialProcedureId": 1,
                    "lossDate": "1778-05-18T00:00:00.000Z",
                    "lossHour": "1",
                    "lossLocation": "1",
                    "policyNumber": "5555",
                    "pvNumber": "1",
                    "rejectionReason": "sxksokdsokc",
                    "responsibilityShare": "LKK",
                    "status": "in",
                    "updatedAt": null,
                    "updatedBy": "miii",
                    "vehicule": {
                        "brand": "yy",
                        "createdAt": null,
                        "id": 1,
                        "opposingParty": "YYY",
                        "registrationNumber": "566",
                        "updatedAt": null
                    },
                    "vehiculeId": 1
                }
            ],
            "total": countClaims
        },
        "validated": {
            "claims": [
                {
                    "accidentDescription": "sldks",
                    "authorityName": "7HHH",
                    "authorityType": 1,
                    "claimNumber": "1",
                    "createdAt": null,
                    "createdBy": "yoo",
                    "decidedAt": "1999-12-15T00:00:00.000Z",
                    "decidedBy": "lskxos",
                    "driver": {
                        "cin": "bb",
                        "createdAt": null,
                        "dateOfBirth": "1777-08-08T00:00:00.000Z",
                        "driverLicenseCategory": 1,
                        "driverLicenseId": "1",
                        "driverLicenseIssueDate": "1888-03-03T00:00:00.000Z",
                        "firstName": "yomi",
                        "id": 3,
                        "lastName": "yami",
                        "sex": "autre",
                        "updatedAt": null
                    },
                    "driverId": 3,
                    "id": 1,
                    "judicialProcedureId": 1,
                    "lossDate": "1778-05-18T00:00:00.000Z",
                    "lossHour": "1",
                    "lossLocation": "1",
                    "policyNumber": "5555",
                    "pvNumber": "1",
                    "rejectionReason": "sxksokdsokc",
                    "responsibilityShare": "LKK",
                    "status": "in",
                    "updatedAt": null,
                    "updatedBy": "miii",
                    "vehicule": {
                        "brand": "yy",
                        "createdAt": null,
                        "id": 1,
                        "opposingParty": "YYY",
                        "registrationNumber": "566",
                        "updatedAt": null
                    },
                    "vehiculeId": 1
                }
            ],
            "total": countClaims
        }
    };
      expect(claims).toEqual(resultFindClaimsStatsLimit)
    })
  })

  describe('getClaimsByStatus', () => {
    it('should return claims', async () => {
      const count = 4;
      const result = [
        {
          "id": 1,
          "policyNumber": "5555",
          "claimNumber": "1",
          "pvNumber": "1",
          "lossLocation": "1",
          "lossHour": "1",
          "lossDate": "1778-05-18T00:00:00.000Z",
          "authorityName": "7HHH",
          "responsibilityShare": "LKK",
          "accidentDescription": "sldks",
          "judicialProcedureId": 1,
          "createdBy": "yoo",
          "updatedBy": "miii",
          "status": "in",
          "rejectionReason": "sxksokdsokc",
          "decidedBy": "lskxos",
          "decidedAt": "1999-12-15T00:00:00.000Z",
          "driverId": 3,
          "authorityType": 1,
          "vehiculeId": 1,
          "createdAt": null,
          "updatedAt": null,
          "vehicule": {
            "id": 1,
            "brand": "yy",
            "registrationNumber": "566",
            "opposingParty": "YYY",
            "createdAt": null,
            "updatedAt": null
          },
          "driver": {
            "id": 3,
            "firstName": "yomi",
            "lastName": "yami",
            "cin": "bb",
            "dateOfBirth": "1777-08-08T00:00:00.000Z",
            "sex": "autre",
            "driverLicenseIssueDate": "1888-03-03T00:00:00.000Z",
            "driverLicenseCategory": 1,
            "driverLicenseId": "1",
            "createdAt": null,
            "updatedAt": null
          }
        }
      ]
      const countClaims = 10 ;
      jest.spyOn(claimService, 'findAllWhen').mockImplementation((): any => Promise.resolve(result));
      jest.spyOn(claimService, 'countWhen').mockImplementation((): any => countClaims);

      const claims = await service.getClaimsByStatus('test', 1, count, 'me')
      expect(claimService.findAllWhen).toHaveBeenCalled();
      expect(claimService.countWhen).toHaveBeenCalled();
      expect(claims).toEqual({
        total :countClaims,
        claims: result,
      })
      
    })
  })

  describe('geLatestClaimsByStatus', () => {
    it('should return claims', async () => {
      const count = 4;
      const result = [
        {
          "id": 1,
          "policyNumber": "5555",
          "claimNumber": "1",
          "pvNumber": "1",
          "lossLocation": "1",
          "lossHour": "1",
          "lossDate": "1778-05-18T00:00:00.000Z",
          "authorityName": "7HHH",
          "responsibilityShare": "LKK",
          "accidentDescription": "sldks",
          "judicialProcedureId": 1,
          "createdBy": "yoo",
          "updatedBy": "miii",
          "status": "in",
          "rejectionReason": "sxksokdsokc",
          "decidedBy": "lskxos",
          "decidedAt": "1999-12-15T00:00:00.000Z",
          "driverId": 3,
          "authorityType": 1,
          "vehiculeId": 1,
          "createdAt": null,
          "updatedAt": null,
          "vehicule": {
            "id": 1,
            "brand": "yy",
            "registrationNumber": "566",
            "opposingParty": "YYY",
            "createdAt": null,
            "updatedAt": null
          },
          "driver": {
            "id": 3,
            "firstName": "yomi",
            "lastName": "yami",
            "cin": "bb",
            "dateOfBirth": "1777-08-08T00:00:00.000Z",
            "sex": "autre",
            "driverLicenseIssueDate": "1888-03-03T00:00:00.000Z",
            "driverLicenseCategory": 1,
            "driverLicenseId": "1",
            "createdAt": null,
            "updatedAt": null
          }
        }
      ]
      const countClaims = 10 ;
      jest.spyOn(claimService, 'findAllWhen').mockImplementation((): any => Promise.resolve(result));
      jest.spyOn(claimService, 'countWhen').mockImplementation((): any => countClaims);

      const claims = await service.geLatestClaimsByStatus('test', 2)
      expect(claimService.findAllWhen).toHaveBeenCalled();
      expect(claimService.countWhen).toHaveBeenCalled();
      expect(claims).toEqual({
        total :countClaims,
        claims: result,
      })
      
    })
  })
});
