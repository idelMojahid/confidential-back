import { Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { documentsProviders } from './document.providers';
import { DatabaseModule } from '../../db/db.module';

@Module({
  imports: [DatabaseModule],
  controllers: [DocumentController],
  providers: [DocumentService, ...documentsProviders],
  exports: [DocumentService],
})
export class DocumentModule {}
