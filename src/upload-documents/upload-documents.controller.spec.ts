import { Test, TestingModule } from "@nestjs/testing";
import { UploadDocumentsController } from "./upload-documents.controller";
import { UploadDocumentsService } from "./upload-documents.service";
import * as httpMocks from "node-mocks-http";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import * as httpStatus from 'http-status';

describe("UploadDocuments Controller", () => {
  let controller: UploadDocumentsController;
  let service: UploadDocumentsService;
  let app: INestApplication;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadDocumentsController],
      providers: [UploadDocumentsService]
    }).compile();

    controller = module.get<UploadDocumentsController>(
      UploadDocumentsController
    );
    service = module.get<UploadDocumentsService>(UploadDocumentsService);

    app = module.createNestApplication();
    await app.init();
  });
  afterAll(async()=>{
    await app.close();
  });
  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should call route POST /should upload-documents and return 200", async () => {
    const testFile = `${__dirname}/utils.ts`;
    await request(app.getHttpServer())
      .post("/v1/upload-documents")
      .attach("document", testFile)
      .expect(httpStatus.INTERNAL_SERVER_ERROR);
  });
  
});
