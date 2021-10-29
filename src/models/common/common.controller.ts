import { Controller, Get, Post, Request, Response, Param } from '@nestjs/common';
import { CommonService } from './common.service';
import { Listings } from './common.typings';
import * as httpStatus from 'http-status';
import { isEmpty, includes } from 'lodash';
import { CLAIMS_STATUS } from '../../constants'

@Controller('common')
export class CommonController {
   constructor(
      private readonly commonService: CommonService,
   ) { }

   @Get('/listings')
   async getListings(): Promise<Listings> {
      return await this.commonService.getListings();
   }

   @Post('/preopen-claim')
   async preopenClaim(@Request() req, @Response() res): Promise<{}> {
      const { victims, documents, claim } = req.body.claimToPreOpen;

      if (isEmpty(claim) || isEmpty(documents) || isEmpty(victims)) {
         return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST });
      }

      try {
         await this.commonService.preOpenClaim(req.body.claimToPreOpen);
         return res.status(httpStatus.OK).json({ status: httpStatus.OK });
      } catch (error) {
         return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error });
      }
   }

   @Post('/search-claim')
   async searchClaim(@Request() req, @Response() res): Promise<{}> {
      const { lossDate, registrationNumber, policyNumber } = req.body;

      if (isEmpty(lossDate) || (isEmpty(registrationNumber) && isEmpty(policyNumber))) {
         return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST });
      }

      const claims = await this.commonService.findClaimsWhere(policyNumber, registrationNumber, lossDate)
      return res.status(httpStatus.OK).json(claims);
   }
   @Post('/claims-stats')
   async claimsStats(@Request() req, @Response() res): Promise<{}> {
      const { count } = req.body;
      if (!count) {
         return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST });
      }
      const claims = await this.commonService.findClaimsStatsLimit(count);
      return res.status(httpStatus.OK).json(claims);
   }

   @Get('/claims')
   async getAllPendingOrValisatedClaims(@Request() req, @Response() res): Promise<{}> {
      const name = req.headers.name
      const { statu, page, pageSize } = req.query;
      const status = [CLAIMS_STATUS.PENDING, CLAIMS_STATUS.VALIDATED]
      if (!statu || !page || !pageSize || !name || !includes(status, statu)) {
         return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST });
      }
      try {
         const resule = await this.commonService.getClaimsByStatus(statu, page, pageSize, name);
         return res.status(httpStatus.OK).json(resule);
      } catch (e) {
         return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, console: e });
      }
   }

   @Get('/get-latest-claims/:status')
   async geLatestClaimsForManager(@Request() req, @Response() res, @Param('status') status): Promise<{}> {
      const { limit } = req.query;
      const defaultStatus = Object.values(CLAIMS_STATUS);
      if ( !limit ) {
         return res.status(httpStatus.BAD_REQUEST).json({ status: httpStatus.BAD_REQUEST });
      }

      if (!includes(defaultStatus, status)) {
         return res.status(httpStatus.NOT_FOUND).json({ status: httpStatus.NOT_FOUND });
      }

      try {
         const resule = await this.commonService.geLatestClaimsByStatus(status, limit);
         return res.status(httpStatus.OK).json(resule);
      } catch (e) {
         return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: httpStatus.INTERNAL_SERVER_ERROR, console: e });
      }
   }

}
