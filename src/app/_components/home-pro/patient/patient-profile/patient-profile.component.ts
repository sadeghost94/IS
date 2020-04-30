import {Component, Inject, Input, OnInit, SimpleChanges} from '@angular/core';
import {SchedulerEvent, SchedulerModule} from '@progress/kendo-angular-scheduler';
import {displayDate, sampleData} from "./events.utc";
import {MatDialog} from '@angular/material/dialog';
import {PatientDto} from "../../../../dto/patient/PatientDto";
import {PatientService} from "../../../../_services/patient.service";
import {SocioDemographicVariablesDto} from "../../../../dto/medicalfile/SocioDemographicVariablesDto";
import { Response} from "../../../../dto";
import {MedicalFileHistoryDto} from "../../../../dto/medicalfile/MedicalFileHistoryDto";
import {AntecedentsDto} from "../../../../dto/medicalfile/AntecedentsDto";
import {ModalService} from "../../../_modal";
import {RecomandationComponent} from "../recomandation/recomandation.component";
import { Router} from "@angular/router";
import {BilanLipidiqueComponent} from "../bilan-lipidique/bilan-lipidique.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MedicalFileDto} from "../../../../dto/medicalfile/MedicalFileDto";
import {AppointmentDto} from "../../../../dto/AppointmentDto";
import {HistoireSanteComponent} from "../histoire-sante/histoire-sante.component";
import {SociodemoComponent} from "../sociodemo/sociodemo.component";

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  @Input() id: string;
  patient : PatientDto = null;
  medicalfile : MedicalFileDto = null
  list_ante : MedicalFileHistoryDto[]
  antecedents : AntecedentsDto[]
  socioDemo : SocioDemographicVariablesDto = null;
  public selectedDate: Date = displayDate;
  ant: any[]
  age = null
  weight = null
  imc = null
  height = null
  listVisites : AppointmentDto[] = null
  lastVisite : AppointmentDto = null

  mySubscription : any
  private modals;
  public events: SchedulerEvent[] = sampleData;

  constructor(private  patientService: PatientService, private modalService : ModalService,
              public dialog: MatDialog, public router : Router,private _snackBar : MatSnackBar) {




  }

  ngOnDestroy() {
    //this.patient = null
  }

  ngOnInit() {
    this.getAllUsers()


  }


  ngOnChanges(changes: SimpleChanges) {
    this.getAllUsers()
    this.patient = changes.patient.currentValue
    console.log("ayo")


  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,

    })}
  reco(patient : PatientDto){
    const dialogRef = this.dialog.open(RecomandationComponent, {
      data: {patient: patient }
    });

  }
  add_antecedent(id : string){
    const dialogRef = this.dialog.open(HistoireSanteComponent, {
      data: {id: id }
    });
  }
  add_socio(id : string){
    const dialogRef = this.dialog.open(SociodemoComponent, {
      data: {id: id }
    });
  }
  lipdProfile(patient : PatientDto){
    const dialogRef = this.dialog.open(BilanLipidiqueComponent, {
      data: {patient: patient,
             }
    });
    dialogRef.afterClosed().subscribe(result => {
     // this.openSnackBar(result,"Ok")
    })
  }

  openModal(id: string) {
    this.modalService.open(id);
  }
  close(id: string) {
    // close modal specified by id
    const modal = this.modals.find(x => x.id === id);
    modal.close();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  public getAllUsers = () => {
    this.patientService.getPatient(this.id).subscribe(patients => {
      let socio = patients as Response
      this.patient = JSON.parse(JSON.stringify(socio.object))as PatientDto
      this.medicalfile = this.patient.medicalFile as MedicalFileDto
      this.socioDemo = JSON.parse(this.patient.socioDemographicVariables) as SocioDemographicVariablesDto
      console.log(this.socioDemo)
      console.log(this.patient)
      console.log(this.medicalfile)
      if(this.medicalfile.clinicalExamination.length > 0)
      {
        this.weight = this.medicalfile.clinicalExamination[this.medicalfile.clinicalExamination.length-1].anthropometry.weight
        this.weight = this.medicalfile.clinicalExamination[this.medicalfile.clinicalExamination.length-1].anthropometry.weight
        this.imc = this.medicalfile.clinicalExamination[this.medicalfile.clinicalExamination.length-1].anthropometry.imc
        this.height = this.medicalfile.clinicalExamination[this.medicalfile.clinicalExamination.length-1].anthropometry.height
        }
        else{
          this.weight = null
          this.age = null
        this.imc = null
        this.height = null
      }
      if(this.medicalfile.medicalFileHistory.length > 0)
      {
        this.list_ante = this.medicalfile.medicalFileHistory
        for(let i=0; i<this.list_ante.length; i++){
          if(i==0){
            this.antecedents = [JSON.parse(this.list_ante[i].antecedents)]

          }else{
          this.antecedents.push(JSON.parse(this.list_ante[i].antecedents))}
        }
        console.log(this.antecedents)
        console.log(this.list_ante)

      }else{
        this.list_ante = null

      }
      //this.liste_antecedants = JSON.parse(JSON.stringify(this.patient.medicalFile.medicalFileHistory)) as MedicalFileHistoryDto[]
      //console.log(this.liste_antecedants[0].antecedents)


    });

       this.getAllVisites()


  }
  public getAllVisites = () => {
    this.patientService.getRdv(this.id).subscribe( patients => {
      // let tabusers = JSON.parse(JSON.stringify(users.toString()))
      let pat = JSON.parse(JSON.stringify(patients))
      console.log(pat)
      this.listVisites = pat.object as AppointmentDto[]
      this.lastVisite = this.listVisites[this.listVisites.length-1]
      console.log(this.listVisites)
      console.log(this.lastVisite)



    });
    // console.log("yes "+this.users)
  }
}



