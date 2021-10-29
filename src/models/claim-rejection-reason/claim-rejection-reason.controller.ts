import { Controller } from '@nestjs/common';
import { ClaimRejectionReasonService } from './claim-rejection-reason.service';

@Controller('claim-rejection-reason')
export class ClaimRejectionReasonController {
    constructor(private readonly claimRejectionReasonService: ClaimRejectionReasonService) {}

}
