import {LivingEnvironmentDto} from "./LivingEnvironmentDto";

export class SocioDemographicVariablesDto {

  age : number;
  gender : string
  civilStatus : string;
  familyIncome : number;
  jobStatus : string;
  education : string;
  livingEnvironment : LivingEnvironmentDto;


  constructor(age: number, civilStatus: string, familyIncome: number, jobStatus: string, education: string, livingEnvironment: LivingEnvironmentDto, gender : string) {
    this.age = age;
    this.civilStatus = civilStatus;
    this.familyIncome = familyIncome;
    this.jobStatus = jobStatus;
    this.education = education;
    this.livingEnvironment = livingEnvironment;
    this.gender = gender
  }
}
