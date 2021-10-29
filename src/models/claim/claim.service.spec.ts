import { Test, TestingModule } from '@nestjs/testing';
import { ClaimService } from './claim.service';
import { claimProviders } from './claim.providers';
import { repositoryMockFactory } from '../../../test/mock-factory';
import { ClaimType } from './claim.typings';
import { Vehicule as VehiculeEntity } from '../vehicule/vehicule.entity';
import { Driver as DriverEntity } from '../driver/driver.entity';
import { Victim as VictimEntity } from '../victim/victim.entity';
import { AuthorityType as AuthorityTypeEntity } from '../authority-type/authority-type.entity';
import { JudicialProcedure as JudicialProcedureEntity } from '../judicial-procedure/judicial-procedure.entity';
import { databaseProviders } from '../../db/db.providers';
import { ClaimRejectionReasonService } from '../claim-rejection-reason/claim-rejection-reason.service';
import { claimRejectionReasonProviders } from '../claim-rejection-reason/claim-rejection-reason.providers';

describe('ClaimService', () => {
  let service: ClaimService;
  let claimRejectionReasonService: ClaimRejectionReasonService;
  let claimRepo: any;
  let dbRepo: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClaimService, { provide: 'CLAIMS_REPOSITORY', useFactory: repositoryMockFactory }, ...claimProviders,...databaseProviders,ClaimRejectionReasonService,{ provide: 'CLAIM_REJECTION_REASONS_REPOSITORY', useFactory: repositoryMockFactory },...claimRejectionReasonProviders],
    }).compile();

    service = module.get<ClaimService>(ClaimService);
    claimRejectionReasonService = module.get<ClaimRejectionReasonService>(ClaimRejectionReasonService);
    claimRepo = module.get('CLAIMS_REPOSITORY');
    dbRepo = module.get('SEQUELIZE');

  });

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all stored claim', async () => {
      const claim: ClaimType = {
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
        driverId: 123,
        authorityType: 9,
        vehiculeId: 234,
        rejectionReason: 'fake-rejection-reason',
        updatedAt: new Date('2020-01-01'),
        createdAt: new Date('2020-01-01'),
      };

      jest.spyOn(claimRepo, 'findAll').mockResolvedValueOnce(claim);

      const response = await service.findAll();

      expect(claimRepo.findAll).toHaveBeenCalled;
      expect(response).toBe(claim);
    });
  });

  describe('insertClaim', () => {
    it('should insert claim', async () => {
      const claim: ClaimType = {
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
        driverId: 123,
        authorityType: 9,
        vehiculeId: 234,
        rejectionReason: 'fake-rejection-reason',
        updatedAt: new Date('2020-01-01'),
        createdAt: new Date('2020-01-01'),
      };

      jest.spyOn(claimRepo, 'create').mockResolvedValueOnce(['claim-created']);

      const response = await service.insertClaim(claim);

      expect(claimRepo.create).toHaveBeenCalled;
      expect(response).toEqual(['claim-created']);
    });
  });

  describe('findAllWhen', () => {
    it('should return claims when', async() => {
      const claims = [{
        policyNumber: 'test',
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
        driverId: 123,
        authorityType: 9,
        vehiculeId: 234,
        rejectionReason: 'fake-rejection-reason',
        updatedAt: new Date('2020-01-01'),
        createdAt: new Date('2020-01-01'),
      }];
      jest.spyOn(claimRepo, 'findAll').mockResolvedValueOnce(claims);

      const response = await service.findAllWhen({policyNumber:'test'});
      expect(claimRepo.findAll).toHaveBeenCalledWith({policyNumber:'test'})
      expect(response).toEqual(claims)
    })
  })

  describe('countWhen', () => {
    it('should return count when', async() => {
      const count = 10;
      jest.spyOn(claimRepo, 'count').mockResolvedValueOnce(count);

      const response = await service.countWhen({policyNumber:'test'});
      expect(claimRepo.count).toHaveBeenCalledWith({policyNumber:'test'})
      expect(response).toEqual(count)
    })
  });

  describe('findById', () => {
    it('should return claim by id', async() => {
        const id = 8
        const claim = {
          "id": 8,
          "policyNumber": "fake-policy",
          "claimNumber": null,
          "pvNumber": "",
          "lossLocation": "fake-location",
          "lossHour": "20",
          "lossDate": "2020-01-18T23:00:00.000Z",
          "authorityName": "X",
          "responsibilityShare": null,
          "accidentDescription": null,
          "createdBy": "FAKE-CREATOR",
          "updatedBy": null,
          "status": "fake-status",
          "rejectionReason": null,
          "decidedBy": null,
          "decidedAt": null,
          "judicialProcedureId": 1,
          "driverId": null,
          "authorityType": 1,
          "vehiculeId": null,
          "createdAt": null,
          "updatedAt": null,
          "driver": null,
          "victims": [],
          "vehicule": null,
          "authority": {
              "id": 1,
              "title": "fake-authority",
              "isVisible": true,
              "createdAt": null,
              "updatedAt": null
          },
          "judicialProcedure": {
              "id": 1,
              "title": "fake-judicial",
              "isVisible": true,
              "createdAt": null,
              "updatedAt": null
          }
      };
      jest.spyOn(claimRepo, 'findOne').mockResolvedValueOnce(claim);

      const response = await service.findById(id);
      expect(claimRepo.findOne).toHaveBeenCalledWith(
        {
          where: { id:id },
          include:[DriverEntity,VictimEntity,VehiculeEntity,AuthorityTypeEntity,JudicialProcedureEntity]
        }
      );
      expect(response).toEqual(claim)
    })
  })
  describe('rejectClaim', () => {
    it('should start transaction to change status of claim and insert claim rejection reasons', async() => {
      const claimId = 1;
      const rejectionReasonIds = [1,2];

      jest.spyOn(claimRepo, 'update').mockResolvedValueOnce(['claim-created']);
      jest.spyOn(claimRejectionReasonService, 'insertClaimRejectionReasons').mockResolvedValueOnce(['claim-rejection-resons']);

      await service.rejectClaim(claimId,rejectionReasonIds);
      expect(claimRepo.update).toHaveBeenCalled;
      expect(claimRejectionReasonService.insertClaimRejectionReasons).toHaveBeenCalled;

    })
  });
});
