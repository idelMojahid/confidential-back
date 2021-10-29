import { Injectable, Inject } from '@nestjs/common';
import { AuthorityType } from './authority-type.entity';

@Injectable()
export class AuthorityTypeService {
  constructor(
    @Inject('AUTHORITY_TYPES_REPOSITORY')
    private readonly claimsRepository: typeof AuthorityType,
  ) {}
  async findAll(): Promise<AuthorityType[]> {
    return this.claimsRepository.findAll<AuthorityType>();
  }
}
