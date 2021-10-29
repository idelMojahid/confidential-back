import { Controller } from '@nestjs/common';
import { RejectionReasonService } from './rejection-reason.service';

@Controller('rejection-reason')
export class RejectionReasonController {
    constructor(private readonly rejectionReasonService: RejectionReasonService) {}
}
