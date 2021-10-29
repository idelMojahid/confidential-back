import { Controller, Get } from '@nestjs/common';
import { AuthorityTypeService } from './authority-type.service';

@Controller('authority-type')
export class AuthorityTypeController {
  constructor(private readonly authorityTypeService: AuthorityTypeService) {}

  @Get()
  async getAuthorityTypes() {
    const authorityTypes = await this.authorityTypeService.findAll();
    return authorityTypes;
  }
}
