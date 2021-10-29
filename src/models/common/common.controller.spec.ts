import { Test, TestingModule } from '@nestjs/testing';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import * as request from 'supertest';
import * as httpStatus from 'http-status';
import { INestApplication } from '@nestjs/common';
import * as mockHttp from 'node-mocks-http';

describe('Common Controller', () => {
  let controller: CommonController;
  let service: CommonService;
  let app: INestApplication;
  let module: TestingModule;
  const getListingMock = jest.fn(() => Promise.resolve(['fake-listings']));
  const preOpenClaimMock = jest.fn(() => Promise.resolve(['claim-preopened']));
  const findClaimsWhereMock = jest.fn(() => Promise.resolve(['claim']));
  const searchClaimMock = jest.fn(() => Promise.resolve(['claim']));
  const claimsStatsMock = jest.fn(() => Promise.resolve(['claims-stats']))
  const getAllPendingOrValisatedClaimsMock = jest.fn(() => Promise.resolve(['get-all-pending-or-valisated-claims']))
  const getClaimsByStatusMock = jest.fn(() => Promise.resolve(['get-all-pending-or-valisated-claims']))
  const geLatestClaimsForManagerMock = jest.fn(() => Promise.resolve(['claim']));
  const geLatestClaimsByStatusMock = jest.fn(() => Promise.resolve(['claim']));

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [CommonController],
      providers: [{ provide: CommonService, useValue: { getListings: getListingMock, preOpenClaim: preOpenClaimMock, findClaimsWhere: findClaimsWhereMock, searchClaim: searchClaimMock, findClaimsStatsLimit: claimsStatsMock, getAllPendingOrValisatedClaims: getAllPendingOrValisatedClaimsMock, getClaimsByStatus: getClaimsByStatusMock, geLatestClaimsForManager: geLatestClaimsForManagerMock, geLatestClaimsByStatus: geLatestClaimsByStatusMock} }],
    })
      .compile();

    controller = module.get<CommonController>(CommonController);
    service = module.get<CommonService>(CommonService);

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe('GET /listings', () => {
    it('should call /listings and send correct response', (done) => {

      jest.spyOn(controller, 'getListings').mockImplementation(getListingMock as any);

      request(app.getHttpServer())
        .get('/common/listings')
        .expect(httpStatus.OK)
        .expect(['fake-listings'])
        .end((error) => {
          if (error) { done(error); }
          expect(controller).toBeDefined();
          expect(service).toBeDefined();
          expect(controller.getListings).toHaveBeenCalled;
          done();
        });
    });
  });

  describe('getListings', () => {
    it('should call CommonService.getListings and return array of listings', async () => {
      jest.spyOn(service, 'getListings').mockImplementation((): any => Promise.resolve(['fake-listings']));
      const response = await controller.getListings();

      expect(service.getListings).toHaveBeenCalled;
      expect(response).toEqual(['fake-listings']);

    });
  });

  describe('POST /preopen-claim', () => {
    let claimToPreOpen;
    beforeEach(() => {
      claimToPreOpen = {
        claim: {
          policyNumber: 'fake-policy-number',
          claimNumber: 'fake-claim-number',
          pvNumber: 'fake-pv-number',
          lossLocation: 'fake-location',
          lossHour: '09:00',
          lossDate: '2020-01-01',
          authorityName: 'fake-name',
          responsibilityShare: '90',
          accidentDescription: 'description',
          judicialProcedureId: 1,
          createdBy: 'username',
          updatedBy: 'username-1',
          status: 'fake-status',
          decidedBy: 'username',
          decidedAt: '2020-01-01',
          authorityType: 2,
          rejectionReason: 'fake-rejection-reason',
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
        }],
        documents: [{
          url: 'fake-url',
          name: 'fake-name',
          type: 'fake-type',
          isVisible: true,
          indexedAt: '2020-02-01',
          isIndexed: true,
        }],
        vehicule: {},
      };
    });

    it('should call /preopen-claim and send correct response', (done) => {

      jest.spyOn(controller, 'preopenClaim').mockImplementation(preOpenClaimMock as any);

      request(app.getHttpServer())
        .post('/common/preopen-claim')
        .send({ claimToPreOpen })
        .expect(httpStatus.OK)
        .expect({ status: httpStatus.OK })
        .end((error) => {
          if (error) { done(error); }
          expect(controller).toBeDefined();
          expect(service).toBeDefined();
          expect(controller.preopenClaim).toHaveBeenCalled;
          done();
        });
    });

    it('should call /preopen-claim and send Bad request when claim, victims or documents arent defined', (done) => {

      jest.spyOn(controller, 'preopenClaim').mockImplementation(preOpenClaimMock as any);

      request(app.getHttpServer())
        .post('/common/preopen-claim')
        .send({ claimToPreOpen: { ...claimToPreOpen, victims: [] } })
        .expect(httpStatus.BAD_REQUEST)
        .expect({ status: httpStatus.BAD_REQUEST })
        .end((error) => {
          if (error) { done(error); }
          expect(controller).toBeDefined();
          expect(service).toBeDefined();
          expect(controller.preopenClaim).toHaveBeenCalled;
          done();
        });
    });

    it('should call /preopen-claim and send INTERNAL_SERVER_ERROR when an error is encountered', (done) => {

      jest.spyOn(controller, 'preopenClaim').mockImplementation(() => { throw new Error('error-encountered'); });

      request(app.getHttpServer())
        .post('/common/preopen-claim')
        .send({})
        .expect(httpStatus.INTERNAL_SERVER_ERROR)
        .end((error) => {
          if (error) { done(error); }
          expect(controller).toBeDefined();
          expect(service).toBeDefined();
          expect(controller.preopenClaim).toHaveBeenCalled;
          done();
        });
    });
  });

  describe('preopenClaim', () => {
    it('should call CommonService.preOpenClaim and return OK if victims, documents and claim are defined', async () => {
      jest.spyOn(service, 'preOpenClaim').mockImplementation(preOpenClaimMock as any);

      const req = mockHttp.createRequest({
        body: {
          claimToPreOpen: {
            claim: {
              policyNumber: 'fake-policy-number',
              claimNumber: 'fake-claim-number',
              pvNumber: 'fake-pv-number',
              lossLocation: 'fake-location',
              lossHour: '09:00',
              lossDate: '2020-01-01',
              authorityName: 'fake-name',
              responsibilityShare: '90',
              accidentDescription: 'description',
              judicialProcedureId: 1,
              createdBy: 'username',
              updatedBy: 'username-1',
              status: 'fake-status',
              decidedBy: 'username',
              decidedAt: '2020-01-01',
              authorityType: 2,
              rejectionReason: 'fake-rejection-reason',
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
            }],
            documents: [{
              url: 'fake-url',
              name: 'fake-name',
              type: 'fake-type',
              isVisible: true,
              indexedAt: '2020-02-01',
              isIndexed: true,
            }],
            vehicule: {},
          },
        },
      });
      const res = mockHttp.createResponse();

      await controller.preopenClaim(req, res);

      expect(service.preOpenClaim).toHaveBeenCalled;
    });

    it('should call CommonService.preOpenClaim and return OK if victims, documents and claim are defined', async () => {
      jest.spyOn(service, 'preOpenClaim').mockImplementation(preOpenClaimMock as any);

      const req = mockHttp.createRequest({
        body: {
          claimToPreOpen: {
            claim: {
              policyNumber: 'fake-policy-number',
              claimNumber: 'fake-claim-number',
              pvNumber: 'fake-pv-number',
              lossLocation: 'fake-location',
              lossHour: '09:00',
              lossDate: '2020-01-01',
              authorityName: 'fake-name',
              responsibilityShare: '90',
              accidentDescription: 'description',
              judicialProcedureId: 1,
              createdBy: 'username',
              updatedBy: 'username-1',
              status: 'fake-status',
              decidedBy: 'username',
              decidedAt: '2020-01-01',
              authorityType: 2,
              rejectionReason: 'fake-rejection-reason',
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
            }],
            documents: [],
            vehicule: {},
          },
        },
      });
      const res = mockHttp.createResponse();

      await controller.preopenClaim(req, res);

      expect(service.preOpenClaim).not.toHaveBeenCalled;
    });
  });

  describe('searchClaim', () => {
    it('should not call CommonService.findClaimsWhere if lossDate not exist or (registrationNumber and policyNumber) not exist', async () => {
      const req = mockHttp.createRequest({
        body: {},
      });
      const res = mockHttp.createResponse();

      await controller.searchClaim(req, res)

      expect(service.findClaimsWhere).not.toHaveBeenCalled;
    })

    it('should call CommonService.findClaimsWhere and return OK', async () => {
      const req = mockHttp.createRequest({
        body: {
          policyNumber: 'test',
          lossDate: '12/12/2012'
        },
      });
      const res = mockHttp.createResponse();

      await controller.searchClaim(req, res);

      expect(service.findClaimsWhere).toHaveBeenCalled();
    })
  })

  describe('POST /search-claim', () => {
    it('should call /search-claim and send correct response', (done) => {

      jest.spyOn(controller, 'searchClaim').mockImplementation(getListingMock as any);

      request(app.getHttpServer())
        .post('/common/search-claim')
        .send({
          lossDate: '12/12/1212',
          registrationNumber: 'test',
        })
        .expect(httpStatus.OK)
        .expect('')
        .end((error) => {
          if (error) { done(error); }
          expect(controller).toBeDefined();
          expect(service).toBeDefined();
          expect(controller.searchClaim).toHaveBeenCalled;
          done();
        });
    });
  });
  describe('POST /claims-stats', () => {
    it('should call /claims-stats and send correct response', (done) => {

      jest.spyOn(controller, 'claimsStats').mockImplementation(claimsStatsMock as any);
      request(app.getHttpServer())
        .post('/common/claims-stats')
        .send({
          count: 10,
        })
        .expect(httpStatus.OK)
        .end((error) => {
          if (error) { done(error); }
          expect(controller).toBeDefined();
          expect(service).toBeDefined();
          expect(controller.searchClaim).toHaveBeenCalled;
          done();
        });
    });
    it('should call /claims-stats and send BAD_REQUEST', (done) => {

      jest.spyOn(controller, 'claimsStats').mockImplementation(claimsStatsMock as any);
      request(app.getHttpServer())
        .post('/common/claims-stats')
        .expect(httpStatus.BAD_REQUEST)
        .end((error) => {
          if (error) { done(error); }
          expect(controller).toBeDefined();
          expect(service).toBeDefined();
          expect(controller.searchClaim).toHaveBeenCalled;
          done();
        });
    })
  });
  describe('claimsStats', () => {
    it('should not call CommonService.findClaimsStatsLimit if count not exist', async () => {
      const req = mockHttp.createRequest({
        body: {},
      });
      const res = mockHttp.createResponse();

      await controller.claimsStats(req, res)

      expect(service.findClaimsStatsLimit).not.toHaveBeenCalled;
    })

    it('should call CommonService.findClaimsStatsLimit and return OK', async () => {
      const req = mockHttp.createRequest({
        body: {
          count: 3
        },
      });
      const res = mockHttp.createResponse();

      await controller.claimsStats(req, res);

      expect(service.findClaimsStatsLimit).toHaveBeenCalled();
    })
  })

  describe('GET /claims', () => {
    it('should call /claims and send correct response', (done) => {

      jest.spyOn(controller, 'getAllPendingOrValisatedClaims').mockImplementation(getAllPendingOrValisatedClaimsMock as any);
      request(app.getHttpServer())
        .get('/common/claims?statu=PENDING&page=1&pageSize=1')
        .set('name','test')
        .expect(httpStatus.OK)
        .end((error) => {
          if (error) { done(error); }
          expect(controller).toBeDefined();
          expect(service).toBeDefined();
          expect(controller.getAllPendingOrValisatedClaims).toHaveBeenCalled;
          done();
        });
    });
    it('should call /claims and send BAD_REQUEST', (done) => {

      jest.spyOn(controller, 'getAllPendingOrValisatedClaims').mockImplementation(getAllPendingOrValisatedClaimsMock as any);
      request(app.getHttpServer())
        .get('/common/claims?statu=PENDING&pageSize=1&name=mino')
        .expect(httpStatus.BAD_REQUEST)
        .end((error) => {
          if (error) { done(error); }
          expect(controller).toBeDefined();
          expect(service).toBeDefined();
          expect(controller.getAllPendingOrValisatedClaims).toHaveBeenCalled;
          done();
        });
    })
  });

  describe('claimsStats', () => {
    it('should not call CommonService.getAllPendingOrValisatedClaims if one param of query not exist', async () => {
      const req = mockHttp.createRequest({
        body: {},
      });
      const res = mockHttp.createResponse();

      await controller.getAllPendingOrValisatedClaims(req, res)

      expect(service.getClaimsByStatus).not.toHaveBeenCalled;
    })

    it('should call CommonService.getAllPendingOrValisatedClaims and return OK', async () => {
      const req = mockHttp.createRequest({
        query: {
          statu: 'VALIDATED', 
          page: 1, 
          pageSize: 5, 
        },
        headers: {name: 'me'}
      });
      const res = mockHttp.createResponse();

      await controller.getAllPendingOrValisatedClaims(req, res);

      expect(service.getClaimsByStatus).toHaveBeenCalled();
    })
  })

  describe('geLatestClaimsForManager', () => {
    it('should not call CommonService.geLatestClaimsForManager if one param of query not exist', async () => {
      const req = mockHttp.createRequest({
        body: {},
      });
      const res = mockHttp.createResponse();

      await controller.geLatestClaimsForManager(req, res, 'test')

      expect(service.geLatestClaimsByStatus).not.toHaveBeenCalled;
    })

    it('should call CommonService.geLatestClaimsForManager and return OK', async () => {
      const req = mockHttp.createRequest({
        query: {
          limit: 2
        },
      });
      const res = mockHttp.createResponse();

      await controller.geLatestClaimsForManager(req, res, 'VALIDATED');

      expect(service.geLatestClaimsByStatus).toHaveBeenCalled();
    })
  })

  describe('GET /get-latest-claims', () => {
    it('should call /get-latest-claims and send correct response', (done) => {
      jest.spyOn(controller, 'geLatestClaimsForManager').mockImplementation(geLatestClaimsForManagerMock as any);
      request(app.getHttpServer())
        .get('/common/get-latest-claims/VALIDATED?limit=3')
        .expect(httpStatus.OK)
        .end((error) => {
          if (error) { done(error); }
          expect(controller).toBeDefined();
          expect(service).toBeDefined();
          expect(controller.geLatestClaimsForManager).toHaveBeenCalled;
          done();
        });
    });
    

    it('should call /get-latest-claims and send BAD_REQUEST', (done) => {
      jest.spyOn(controller, 'geLatestClaimsForManager').mockImplementation(geLatestClaimsForManagerMock as any);
      request(app.getHttpServer())
        .get('/common/get-latest-claims/VALIDATED')
        .expect(httpStatus.BAD_REQUEST)
        .end((error) => {
          if (error) { done(error); }
          expect(controller).toBeDefined();
          expect(service).toBeDefined();
          expect(controller.geLatestClaimsForManager).not.toHaveBeenCalled;
          done();
        });
    })

    it('should call /get-latest-claims and send NOT_FOUND', (done) => {
      jest.spyOn(controller, 'geLatestClaimsForManager').mockImplementation(geLatestClaimsForManagerMock as any);
      request(app.getHttpServer())
        .get('/common/get-latest-claims/test?limit=3')
        .expect(httpStatus.NOT_FOUND)
        .end((error) => {
          if (error) { done(error); }
          expect(controller).toBeDefined();
          expect(service).toBeDefined();
          expect(controller.geLatestClaimsForManager).not.toHaveBeenCalled;
          done();
        });
    })
  });
});
