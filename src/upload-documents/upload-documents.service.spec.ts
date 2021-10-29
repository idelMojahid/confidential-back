import { Test, TestingModule } from "@nestjs/testing";
import { UploadDocumentsService } from "./upload-documents.service";

describe("UploadDocumentsService", () => {
  let service: UploadDocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadDocumentsService]
    }).compile();

    service = module.get<UploadDocumentsService>(UploadDocumentsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
