import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {PatientService} from "../../../../_services/patient.service";
import {SocioDemographicVariablesDto} from "../../../../dto/medicalfile/SocioDemographicVariablesDto";
import {LivingEnvironmentDto} from "../../../../dto/medicalfile/LivingEnvironmentDto";
import {Request, Response} from "../../../../dto";
import {first} from "rxjs/operators";
import {PatientDto} from "../../../../dto/patient/PatientDto";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-sociodemo',
  templateUrl: './sociodemo.component.html',
  styleUrls: ['./sociodemo.component.css']
})
export class SociodemoComponent implements OnInit {
  disabled = false;
  exist = false;
  rural : boolean = false;
  urbaine : boolean = false;
  socioObject;
  modeSelect: string
  Profession_librale: string
  agee ;
  services : boolean ;
  reponse: Response
  Salarie: string
  Salarier: string
  Sans_activite: string
  Etudiant: string
  Autre: string;
  maison_uni :boolean= false;

  constructor(private patientService: PatientService,private _snackBar : MatSnackBar) {


  }

  @Input() id: string;

  ngOnInit() {



  }

 /* getSocio() {
    this.patientService.getSocio(this.id).subscribe(
      rep => {


          let socio = rep as Response
          if(socio.error === null){
          this.socioObject = socio.object as SocioDemographicVariablesDto
          console.log(this.socioObject.civilStatus)
          if (this.socioObject.livingEnvironment.zone=="Zone urbaine"){
              this.urbaine = true

            } else  if (this.socioObject.livingEnvironment.zone=="Zone rurale"){
            this.rural = true

          }
          if(this.socioObject.livingEnvironment.type=="Maison unifamiliale"){
            this.maison_uni = true;

          } else if(this.socioObject.livingEnvironment.type=="Résidence pour retraitée"){
            this.disabled = true;
            if(this.socioObject.livingEnvironment.services==true){
              this.services = true;
            }else {
              this.services = true;

            }

          }
          }
        else {
          this.socioObject = new SocioDemographicVariablesDto(0,"",0,"","",new LivingEnvironmentDto("","",false),"")
        }


       }, error => {

      }
    );

  }*/

  ngOnChanges(changes: SimpleChanges) {
    //this.getSocio()
   /* if (this.exist){
      this.agee = this.socioObject.age
      this.modeSelect = this.socioObject.jobStatus
    }*/

  }

  ajouter(gender, profession, revenu, retraite, services, house_uni,
          cottage, bungalow, condo, zone, age, app, marital, scolarity) {
    let srvice = false, hse_uni, cttge, bglv, cdo, ap, rtraite;
    if (retraite.checked === true) {
      rtraite = retraite.value
      if (services.value == "1") {
        srvice = true
      } else {
        srvice = false
      }

    } else {
      srvice = false
      rtraite = ""


    }
    if (house_uni.checked === true) {
      hse_uni = house_uni.value

    } else {
      hse_uni = ""


    }
    if (bungalow.checked === true) {
      bglv = bungalow.value

    } else {
      bglv = ""


    }
    if (cottage.checked === true) {
      cttge = cottage.value

    } else {
      cttge = ""


    }
    if (condo.checked === true) {
      cdo = condo.value

    } else {
      cdo = ""


    }
    if (app.checked === true) {
      ap = condo.value

    } else {
      ap = ""


    }
    let type = hse_uni + cttge + bglv + cdo + ap + rtraite

    let socioinformation = new SocioDemographicVariablesDto(25, marital, 10000, profession, scolarity, new LivingEnvironmentDto(zone, type, srvice),gender.value)
    console.log(socioinformation)
    console.log(this.id)
    let request = new Request(socioinformation);
    console.log(request)
    this.patientService.addSocio(request, this.id).pipe(first())
      .subscribe(
        data => {
          this.openSnackBar(" AJOUT REUSSI","Ok")


        },
        error => {
          console.log("error")


        });


  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 20000,

    })




  }


}
