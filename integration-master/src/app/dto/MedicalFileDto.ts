

export class MedicalFileDto {
  id : string;
  code : string;
  patient :string;
  vo2: number;
  arterialPressure : number;
  rhr : number;
  imc : number;
  waistSize : number;
  lipidProfile : number;
  glucose : number;
  hba1c : number;


  constructor(id: string, code: string, patient: string, vo2: number, arterialPressure: number, rhr: number, imc: number, waistSize: number, lipidProfile: number, glucose: number, hba1c: number) {
    this.id = id;
    this.code = code;
    this.patient = patient;
    this.vo2 = vo2;
    this.arterialPressure = arterialPressure;
    this.rhr = rhr;
    this.imc = imc;
    this.waistSize = waistSize;
    this.lipidProfile = lipidProfile;
    this.glucose = glucose;
    this.hba1c = hba1c;
  }
}
