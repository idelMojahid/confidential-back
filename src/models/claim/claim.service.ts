import { Injectable, Inject } from '@nestjs/common';
import { Claim } from './claim.entity';
import { ClaimType} from './claim.typings';
import { Transaction } from 'sequelize/types';
import { Vehicule as VehiculeEntity } from '../vehicule/vehicule.entity';
import { Driver as DriverEntity } from '../driver/driver.entity';
import { Victim as VictimEntity } from '../victim/victim.entity';
import { AuthorityType as AuthorityTypeEntity } from '../authority-type/authority-type.entity';
import { JudicialProcedure as JudicialProcedureEntity } from '../judicial-procedure/judicial-procedure.entity';
import { CLAIMS_STATUS } from '../../constants'
import { ClaimRejectionReasonService } from '../claim-rejection-reason/claim-rejection-reason.service';

@Injectable()
export class ClaimService {
  constructor(
    @Inject('CLAIMS_REPOSITORY') private readonly claimsRepository: typeof Claim,
    @Inject('SEQUELIZE') private readonly sequelize,

    private readonly claimRejectionReasonService:ClaimRejectionReasonService
  ) {}
  async findAll(): Promise<ClaimType[]> {
    return this.claimsRepository.findAll<Claim>();
  }
  async insertClaim(claim: ClaimType, transaction?: Transaction): Promise<ClaimType> {
    return this.claimsRepository.create(claim, {transaction});
  }
  async findAllWhen(condition:{}): Promise<Claim[]>{
    return this.claimsRepository.findAll<Claim>(condition);
  }
  async countWhen(condition:{}): Promise<Number>{
    return this.claimsRepository.count(condition);
  }
  async findById(claimId:number):Promise<Claim>{
    return this.claimsRepository.findOne({
      where: { id:claimId },
      include:[DriverEntity,VictimEntity,VehiculeEntity,AuthorityTypeEntity,JudicialProcedureEntity]
    })
  }
  async rejectClaim(claimId:number,rejectionReasons:number[]):Promise<{}>{
    try {
      return await this.sequelize.transaction(async (transaction: Transaction) => {
        await this.claimsRepository.update({status:CLAIMS_STATUS.REJECTED},{
          where: { id:claimId },
          transaction
        })
        await this.claimRejectionReasonService.insertClaimRejectionReasons(claimId,rejectionReasons,transaction)
      })
    } catch (error) {
      throw error;
    }
    
    
  }
}
