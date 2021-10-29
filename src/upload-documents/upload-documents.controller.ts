import {
  Controller,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import * as multerS3 from "multer-s3";
import * as AWS from "aws-sdk";
import { editFileName } from "./utils";
import { get } from "lodash";
@Controller("v1/upload-documents")
export class UploadDocumentsController {
  constructor() {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
  }

  /* istanbul ignore next */
  @Post()
  @UseInterceptors(
    FileInterceptor("document", {
      storage: multerS3({
        s3: new AWS.S3(),
        bucket: get(process.env, "AWS_S3_BUCKET_NAME", "default-bucket"),
        acl: "public-read",
        key: function(request, file, cb) {
          const fileName = `${editFileName(file.originalname)}`;
          cb(null, fileName);
        }
      })
    })
  )
  /* istanbul ignore next */
  async uploadDocument(@UploadedFile() file, @Res() res) {
    if (file) {
      return res.status(200).json({ response: file.location });
    }
    return res.status(500).json({ error: "No file uploaded" });
  }
}
