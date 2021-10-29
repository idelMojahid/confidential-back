import { Procedure } from "../procedure/procedure.entity";
import { JudicialProcedure } from "../judicial-procedure/judicial-procedure.entity";
import { AuthorityType } from "../authority-type/authority-type.entity";
import { DrivingLicenseCategory } from "../driving-license-category/driving-license-category.entity";
import { ClaimType } from "../claim/claim.typings";
import { Driver } from "../driver/driver.entity";
import { VictimType } from "../victim/victim.typings";
import { Document } from "../document/document.entity";
import { Vehicule } from "../vehicule/vehicule.entity";
import { DocumentType } from "../document/document.typings";
import { VehiculeType } from "../vehicule/vehicule.typings";
import { DriverType } from "../driver/driver.typings";
import { WorkAccident } from "../work-accident/work-accident.entity";
import { DamageType } from "../damage-type/damage-type.entity";
import { RejectionReason } from "../rejection-reason/rejection-reason.entity";
import { InsuranceCompany } from "../insurance-company/insurance-company.entity";




export interface Listings {
    procedures: Procedure[], judicialProcedures: JudicialProcedure[], authorityTypes: AuthorityType[],
    drivingLicenseCategories: DrivingLicenseCategory[], workAccidents: WorkAccident[], damageTypes: DamageType[],
    rejectionReasons: RejectionReason[],insuranceCompanies:InsuranceCompany[]
}

export interface ClaimDossier {
    claim: ClaimType,
    driver: DriverType | {},
    victims: VictimType[],
    documents: DocumentType[],
    vehicule: VehiculeType | {}
}