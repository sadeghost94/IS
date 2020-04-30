import {LivingEnvironmentDto} from "./LivingEnvironmentDto";

export class SocioDemographicVariablesDto {

  civilStatus : string;
  familyIncome : number;
  jobStatus : string;
  education : string;
  livingEnvironment : LivingEnvironmentDto;


  constructor( civilStatus: string, familyIncome: number, jobStatus: string, education: string, livingEnvironment: LivingEnvironmentDto) {
    this.civilStatus = civilStatus;
    this.familyIncome = familyIncome;
    this.jobStatus = jobStatus;
    this.education = education;
    this.livingEnvironment = livingEnvironment;
  }
}
