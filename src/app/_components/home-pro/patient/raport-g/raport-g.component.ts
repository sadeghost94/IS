import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {PatientDto} from "../../../../dto/patient/PatientDto";
import {AppointmentDto} from "../../../../dto/AppointmentDto";
import {PatientService} from "../../../../_services/patient.service";
import {ClinicalExaminationDto} from "../../../../dto/medicalfile/clinical_examination/ClinicalExaminationDto";
import {LipidProfileDto} from "../../../../dto/medicalfile/LipidProfileDto";
import {MedicalFileHistoryDto} from "../../../../dto/medicalfile/MedicalFileHistoryDto";
import {SocioDemographicVariablesDto} from "../../../../dto/medicalfile/SocioDemographicVariablesDto";
import {MedicalFileDto} from "../../../../dto/medicalfile/MedicalFileDto";
import {AntecedentsDto} from "../../../../dto/medicalfile/AntecedentsDto";

@Component({
  selector: 'app-raport-g',
  templateUrl: './raport-g.component.html',
  styleUrls: ['./raport-g.component.css']
})
export class RaportGComponent implements OnInit {

  @Input() patient: PatientDto;
  date = new Date()
  pharmacotherapy : any []
  antecedents : AntecedentsDto[] = null
  clinicalExamination : ClinicalExaminationDto []
  lipidProfiles : LipidProfileDto[]
  medicalFileHistory : MedicalFileHistoryDto [] = null
  medicalFile : MedicalFileDto
  socioDemographicVariables : SocioDemographicVariablesDto = null;
  nombre_visites : number = 0;
  lis_visites : AppointmentDto [] = null

  constructor(private patientService : PatientService, ) {

  }

  ngOnInit() {
    this.socioDemographicVariables = JSON.parse(this.patient.socioDemographicVariables)
    this.medicalFile = this.patient.medicalFile
    this.medicalFileHistory = this.medicalFile.medicalFileHistory
    this.lipidProfiles = this.medicalFile.lipidProfiles
    this.clinicalExamination = this.medicalFile.clinicalExamination
    for(let i=0; i<this.medicalFileHistory.length; i++){
      if(i==0){
        this.antecedents = [JSON.parse(this.medicalFileHistory[i].antecedents)]

      }else{
        this.antecedents.push(JSON.parse(this.medicalFileHistory[i].antecedents))}
    }
    this.getAllVisites()


  }
  ngOnChanges(changes : SimpleChanges){
    this.socioDemographicVariables = JSON.parse(this.patient.socioDemographicVariables)
    this.medicalFile = this.patient.medicalFile
    this.medicalFileHistory = this.medicalFile.medicalFileHistory
    this.lipidProfiles = this.medicalFile.lipidProfiles
    this.clinicalExamination = this.medicalFile.clinicalExamination
    for(let i=0; i<this.medicalFileHistory.length; i++){
      if(i==0){
        this.antecedents = [JSON.parse(this.medicalFileHistory[i].antecedents)]

      }else{
        this.antecedents.push(JSON.parse(this.medicalFileHistory[i].antecedents))}
    }
    this.getAllVisites()
  }
  public getAllVisites = () => {
    this.patientService.getRdv(this.patient.id).subscribe( visites => {
      // let tabusers = JSON.parse(JSON.stringify(users.toString()))
      let vis = JSON.parse(JSON.stringify(visites))
      console.log(vis)
      this.lis_visites = vis;
      this.nombre_visites = this.lis_visites.length
    });
    // console.log("yes "+this.users)
  }


}
