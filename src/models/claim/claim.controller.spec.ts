import { Test, TestingModule } from '@nestjs/testing';
import { ClaimController } from './claim.controller';
import { ClaimService } from './claim.service';
import { claimProviders } from './claim.providers';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as httpStatus from 'http-status';
import { databaseProviders } from '../../db/db.providers';
import { ClaimRejectionReasonService } from '../claim-rejection-reason/claim-rejection-reason.service';
import { claimRejectionReasonProviders } from '../claim-rejection-reason/claim-rejection-reason.providers';
import * as mockHttp from 'node-mocks-http';


describe('Claim Controller', () => {
  let controller: ClaimController;
  let service: ClaimService;
  let app: INestApplication;
  let module: TestingModule;
  const getClaimByIdMock = jest.fn(()=> Promise.resolve({claim:'fake-claim'}))
  const rejectClaimMock = jest.fn(()=> Promise.resolve({claim:'fake-claim'}))
  const findByIdMock = jest.fn(()=> Promise.resolve({claim:'fake-claim'}))

  beforeAll(async () => {
     module = await Test.createTestingModule({
      controllers: [ClaimController],
      providers: [ClaimService,...claimProviders,...databaseProviders,ClaimRejectionReasonService,...claimRejectionReasonProviders],
    }).compile();

    controller = module.get<ClaimController>(ClaimController);
    service = module.get<ClaimService>(ClaimService);
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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /claim/:claimId', () => {
    it('should call /claim/:claimId and send correct response', (done) => {

      jest.spyOn(controller, 'getClaimById').mockImplementation(getClaimByIdMock as any);

      request(app.getHttpServer())
        .get('/claim/8')
        .expect(httpStatus.OK)
        .expect({claim:'fake-claim'})
        .end((error) => {
          done();
        });
    });
  });
  describe('getClaimById', () => {
    it('should call ClaimController.getClaimById and return object of claim', async () => {
      const params = {claimId:8};
      jest.spyOn(service, 'findById').mockImplementation(findByIdMock as any);
      await controller.getClaimById(params);
      expect(service.findById).toHaveBeenCalledWith(8);

    });
  });

  describe('GET /claim/reject/:claimId', () => {
    it('should call /claim/reject/:claimId and send correct response', (done) => {

      jest.spyOn(controller, 'rejectClaim').mockImplementation(rejectClaimMock as any);

      request(app.getHttpServer())
        .post('/claim/reject/8')
        .expect(httpStatus.OK)
        .end((error) => {
          done();
        });
    });
  });
  describe('rejectClaim', () => {
    it('should not call ClaimController.rejectClaim', async () => {
      const req = mockHttp.createRequest({
        body: {},
      });
      const res = mockHttp.createResponse();
      jest.spyOn(service, 'rejectClaim').mockImplementation(rejectClaimMock as any);
      await controller.rejectClaim(req,res);
      expect(service.rejectClaim).toHaveBeenCalledTimes(0);

    });
    it('should  call ClaimController.rejectClaim ', async () => {
      const req = mockHttp.createRequest({
        body: {
          rejectionReasons: [1,2]
        },
        params:{
          claimId: 1
        }
      });
      const res = mockHttp.createResponse();
      jest.spyOn(service, 'rejectClaim').mockImplementation(rejectClaimMock as any);
      await controller.rejectClaim(req,res);
      expect(service.rejectClaim).toHaveBeenCalledTimes(1);

    });
  });
});
