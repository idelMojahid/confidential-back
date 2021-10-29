import { Test, TestingModule } from '@nestjs/testing';
import { DocumentService } from './document.service';
import { documentsProviders } from './document.providers';
import { repositoryMockFactory } from '../../../test/mock-factory';
import { DocumentType } from './document.typings';

describe('DocumentsService', () => {
  let service: DocumentService;
  let driverRepo: any;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentService, {provide: 'DOCUMENTS_REPOSITORY', useFactory: repositoryMockFactory}, ...documentsProviders],
    }).compile();

    service = module.get<DocumentService>(DocumentService);
    driverRepo = module.get('DOCUMENTS_REPOSITORY');
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all stored documents', async () => {
      const document: DocumentType[] = [{
        id: 1,
        url: 'fake-url',
        name: 'fake-name',
        type: 'fake-type',
        isVisible: true,
        claimId: 165,
        indexedAt: new Date('2020-02-01'),
        isIndexed: true,
      }];

      jest.spyOn(driverRepo, 'findAll').mockResolvedValueOnce(document);

      const response = await service.findAll();

      expect(driverRepo.findAll).toHaveBeenCalled;
      expect(response).toBe(document);
    });
  });

  describe('insertDocument', () => {
    it('should insert document', async () => {
      const document: DocumentType[] = [{
        id: 1,
        url: 'fake-url',
        name: 'fake-name',
        type: 'fake-type',
        isVisible: true,
        claimId: 165,
        indexedAt: new Date('2020-02-01'),
        isIndexed: true,
      }];

      jest.spyOn(driverRepo, 'bulkCreate').mockResolvedValueOnce(['document-created']);

      const response = await service.insertDocument(document);

      expect(driverRepo.bulkCreate).toHaveBeenCalled;
      expect(response).toEqual(['document-created']);
    });
  });
});
