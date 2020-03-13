import {Component, Inject, Input, OnInit, SimpleChanges} from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SchedulerEvent, SchedulerModule} from '@progress/kendo-angular-scheduler';
import {displayDate, sampleData} from "./events.utc";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AffectpodometreComponent} from "../affectpodometre/affectpodometre.component";
import {PatientDto} from "../../../../dto/patient/PatientDto";
import {PatientService} from "../../../../_services/patient.service";
import {SocioDemographicVariablesDto} from "../../../../dto/medicalfile/SocioDemographicVariablesDto";
import {Request, Response} from "../../../../dto";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialogConfig } from '@angular/material/dialog';
import {MedicalFileHistoryDto} from "../../../../dto/medicalfile/MedicalFileHistoryDto";
import {AntecedentsDto} from "../../../../dto/medicalfile/AntecedentsDto";
import {ModalService} from "../../../_modal";
import {LoginComponent} from "../../../login/login.component";
import {ListVisitesComponent} from "../list-visites/list-visites.component";
import {CreaterdvComponent} from "../../../createrdv/createrdv.component";
import {PagepatientComponent} from "../../../pagepatient/pagepatient.component";
import {LogiComponent} from "../list-patients/appoint/logi.component";
import {AddDialogComponent} from "../../../dialogs/add/add.dialog.component";
import {RecomandationComponent} from "../recomandation/recomandation.component";
@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  @Input() id: string;
  patient : PatientDto ;
  liste_antecedants
  list_ante : AntecedentsDto[]
  public selectedDate: Date = displayDate;
  ante ;
  ant: any[]
  antes : any[] ;
  private modals;
  dataa = "ok"
  public events: SchedulerEvent[] = sampleData;

  constructor(private  patientService: PatientService, private modalService : ModalService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllUsers()

  }


  ngOnChanges(changes: SimpleChanges) {
    this.getAllUsers()



  }
  reco(patient : PatientDto){
    const dialogRef = this.dialog.open(RecomandationComponent, {
      data: {patient: patient }
    });

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
      this.patient = socio.object as PatientDto
      console.log(patients)


      //this.liste_antecedants = JSON.parse(JSON.stringify(this.patient.medicalFile.medicalFileHistory)) as MedicalFileHistoryDto[]
      //console.log(this.liste_antecedants[0].antecedents)
      for (let i = 0; i < this.liste_antecedants.length; i++){
         this.ant =JSON.parse(this.liste_antecedants[i].antecedents)

      }
      this.antes = this.ant
      console.log(this.antes)

    });




  }
}



