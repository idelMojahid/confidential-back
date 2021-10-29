import { Injectable, Inject } from '@nestjs/common';
import { RejectionReason } from './rejection-reason.entity';

@Injectable()
export class RejectionReasonService {
  constructor(
    @Inject('REJECTION_REASONS_REPOSITORY')
    private readonly claimsRepository: typeof RejectionReason,
  ) { }

  async findAll(): Promise<RejectionReason[]> {
    return this.claimsRepository.findAll<RejectionReason>();
  }
}
