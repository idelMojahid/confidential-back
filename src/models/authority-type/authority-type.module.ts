import { Module } from '@nestjs/common';
import { AuthorityTypeController } from './authority-type.controller';
import { AuthorityTypeService } from './authority-type.service';
import { authorityTypesProviders } from './authority-type.providers';
import { DatabaseModule } from '../../db/db.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AuthorityTypeController],
  providers: [AuthorityTypeService, ...authorityTypesProviders],
  exports: [AuthorityTypeService],
})
export class AuthorityTypeModule {}
