import { Controller, Get } from '@nestjs/common';
import { DamageTypeService } from './damage-type.service';

@Controller('damage-type')
export class DamageTypeController {
    constructor(private readonly damageTypeService: DamageTypeService) {}
}
