import { Controller, Get, Param,Post ,Request, Response } from '@nestjs/common';
import { ClaimService } from './claim.service';
import * as httpStatus from 'http-status';

@Controller('claim')
export class ClaimController {
  constructor(private readonly claimService: ClaimService) {}

  @Get()
  async getClaims() {
    const claims = await this.claimService.findAll();
    return claims;
  }

  @Get(':claimId')
  async getClaimById(@Param() params) {
    const claim = await this.claimService.findById(params.claimId);
    return claim;
  }

  @Post('/reject/:claimId')
  async rejectClaim(@Request() req, @Response() res): Promise<{}> {
    const {rejectionReasons} = req.body;
    const {claimId} = req.params;

    if(!claimId || !rejectionReasons){
      return res.status(httpStatus.BAD_REQUEST).json({status: httpStatus.BAD_REQUEST});
    }

    await this.claimService.rejectClaim(claimId,rejectionReasons);
    return res.status(httpStatus.OK).json({status: httpStatus.OK});
  }
}
