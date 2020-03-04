import {ContactDto} from "./ContactDto";
import {FamilyDoctorDto} from "./FamilyDoctorDto";
import {PharmacyDto} from "./PharmacyDto";
import {ProfessionalDto} from "./ProfessionalDto";
import {MedicalFileDto} from "../medicalfile/MedicalFileDto";


export class PatientDto {

    id : string;
    fileNumber : string;
    firstName : string;
    lastName : string;
    birthday : string;
    motherName : string;
    contact : ContactDto;
   familyDoctor : FamilyDoctorDto[];
    pharmacy : PharmacyDto [];
    professionals : ProfessionalDto[];
   isActive : boolean;
    medicalFileDto : MedicalFileDto;
    loginCode : string


  constructor(id: string, fileNumber: string, firstName: string, lastName: string, birthday: string, motherName: string, contact: ContactDto, familyDoctor: FamilyDoctorDto[], pharmacy: PharmacyDto[], professionals: ProfessionalDto[], isActive: boolean, medicalFileDto: MedicalFileDto, loginCode : string) {
    this.id = id;
    this.fileNumber = fileNumber;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.motherName = motherName;
    this.contact = contact;
    this.familyDoctor = familyDoctor;
    this.pharmacy = pharmacy;
    this.professionals = professionals;
    this.isActive = isActive;
    this.medicalFileDto = medicalFileDto
    this.loginCode = loginCode
  }
}
