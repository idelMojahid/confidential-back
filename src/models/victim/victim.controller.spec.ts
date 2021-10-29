import { Test, TestingModule } from '@nestjs/testing';
import { VictimController } from './victim.controller';
import { VictimService } from './victim.service';
import { victimProviders } from './victim.providers';

describe('Victim Controller', () => {
  let controller: VictimController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VictimController],
      providers: [VictimService, ...victimProviders],
    }).compile();

    controller = module.get<VictimController>(VictimController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
