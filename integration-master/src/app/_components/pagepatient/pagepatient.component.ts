import {Component, HostBinding, OnInit, SimpleChanges} from '@angular/core';
import {PatientService} from "../../_services/patient.service";
import {ActivatedRoute, Router} from "@angular/router";

import { Response } from "../../dto/Response"


@Component({
  selector: 'app-pagepatient',
  templateUrl: './pagepatient.component.html',
  styleUrls: ['./pagepatient.component.css']
})
export class PagepatientComponent implements OnInit {
  obj ;
  patient;
  token = null;
  firstname ="";
  lastName : "";
  fileNumber ="";
  questionnaireToken;
  socio;
  hasBreq
  expanded : boolean = false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  constructor(    private router: Router,
                  private patientService : PatientService,
              private route: ActivatedRoute,
  ) {
    this.questionnaireToken = localStorage.getItem("currentPatientToken")
  }

  ngOnInit() {

    this.ariaExpanded = this.expanded;
    this.getCodeFromURI()
  }

  is_expanded(){
    this.expanded = !this.expanded

  }

  getCodeFromURI() {

    this.route.queryParams
      .subscribe(params => {
        if(this.questionnaireToken){
          this.token = this.questionnaireToken
        }else{
          this.token = params.token;
        }
           this.patientService.recup_token(this.token).subscribe(
            response => {
               this.obj = JSON.parse(JSON.stringify(response))
              this.patient = this.obj.object
              if(this.patient!=null) {
                this.firstname = this.patient.firstname
                this.lastName = this.patient.lastName
                this.fileNumber = this.patient.fileNumber
                this.hasBreq = this.patient.hasBREQ
                console.log(this.hasBreq)
                this.socio = this.patient.socioDemographicVariables
                console.log(this.obj)
              }else{
                 this.router.navigate(["patient/login"])
              }
              if(this.obj.error != null){
                this.token = null
              }
              else if (this.obj.object.questionnaireToken==null && this.questionnaireToken==null) {
                this.router.navigate(["patient/login"])
              } else {



              }

            },
            error => {

              this.router.navigate(["patient/login"])
            }
          );


      },error => {
        this.router.navigate(["patient/login"])
      });
  }


}
