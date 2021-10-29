import { Injectable, Inject } from '@nestjs/common';
import { Document } from './document.entity';
import { Transaction } from 'sequelize/types';
import { DocumentType } from './document.typings';

@Injectable()
export class DocumentService {
  constructor(
    @Inject('DOCUMENTS_REPOSITORY')
    private readonly documentsRepository: typeof Document,
  ) {}
  async findAll(): Promise<Document[]> {
    return this.documentsRepository.findAll<Document>();
  }
  async insertDocument(documents: DocumentType[], transaction?: Transaction): Promise<DocumentType[]> {
    return this.documentsRepository.bulkCreate(documents, {transaction});
  }
}
