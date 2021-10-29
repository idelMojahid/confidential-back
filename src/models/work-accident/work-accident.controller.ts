import { Controller, Get } from '@nestjs/common';
import { WorkAccidentService } from './work-accident.service';

@Controller('work-accident')
export class WorkAccidentController {
  constructor(private readonly workAccidentService: WorkAccidentService) {}

}
