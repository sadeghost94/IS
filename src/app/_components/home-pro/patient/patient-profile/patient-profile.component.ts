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
import {ForgetpasswordComponent} from "../../../forgetpassword/forgetpassword.component";
import {RdvComponent} from "../../rdv/rdv.component";
@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  @Input() id: string;
  patient ;
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
              public matDialog: MatDialog) {
  }

  ngOnInit() {

  }
  openModel()
  {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "200px";
    dialogConfig.width = "400px";
    // https://material.angular.io/components/dialog/overview
    this.modals = this.matDialog.open(LoginComponent,dialogConfig);

  }
  onNoClick(): void {
    this.modals.close();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getAllUsers()


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


      this.liste_antecedants = JSON.parse(JSON.stringify(this.patient.medicalFile.medicalFileHistory)) as MedicalFileHistoryDto[]
      console.log(this.liste_antecedants[0].antecedents)
      for (let i = 0; i < this.liste_antecedants.length; i++){
         this.ant =JSON.parse(this.liste_antecedants[i].antecedents)

      }
      this.antes = this.ant
      console.log(this.antes)

    });




  }
}



