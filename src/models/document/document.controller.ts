import { Controller, Get } from '@nestjs/common';
import { DocumentService } from './document.service';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  async getClaims() {
    const documents = await this.documentService.findAll();
    return documents;
  }
}
