export class QuestionnaireDto {
   patientId : string;
   type : string;
   value : string;


  constructor(patientId: string, type: string, value: string) {
    this.patientId = patientId;
    this.type = type;
    this.value = value;
  }
}
