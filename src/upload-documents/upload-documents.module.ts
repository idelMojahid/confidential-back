import { Module } from "@nestjs/common";
import { UploadDocumentsController } from "./upload-documents.controller";
import { UploadDocumentsService } from "./upload-documents.service";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [MulterModule.register()],
  controllers: [UploadDocumentsController],
  providers: [UploadDocumentsService]
})
export class UploadDocumentsModule {}
