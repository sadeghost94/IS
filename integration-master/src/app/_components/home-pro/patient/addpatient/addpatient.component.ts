import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MyErrorStateMatcher} from "../../../home/invite/invite.component";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {PatientDto} from "../../../../dto/patient/PatientDto";
import {ContactDto} from "../../../../dto/patient/ContactDto";
import {FamilyDoctorDto} from "../../../../dto/patient/FamilyDoctorDto";
import {PharmacyDto} from "../../../../dto/patient/PharmacyDto";
import {ProfessionalDto} from "../../../../dto/patient/ProfessionalDto";
import {ErrorDto} from "../../../../dto/ErrorDto";
import {PatientService} from "../../../../_services/patient.service";
import {first} from "rxjs/operators";
import {UserService} from "../../../../_services";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Request} from "../../../../dto/Request";


@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.css']
})
export class AddpatientComponent implements OnInit {
  @Output() exampleOutput = new EventEmitter<PatientDto>()
  @Input() error: string | null;

  birthday: string = "";
  submitted = false;
  patient_added = true;
  constructor(private patientService : PatientService,private userService : UserService,
              private _snackBar : MatSnackBar
  ) { }

  ngOnInit() {
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  getBirthday(event: MatDatepickerInputEvent<Date>) {
    const d = new Date(event.value);
    console.log(d)

    let date = d.getDate();
    let jr = date.toString()
    if(date>9){

    }else{
      jr= "0"+date
    }
    console.log(jr)
    const month = d.getMonth() + 1; // Be careful! January is 0 not 1
    let mois = month.toString()
    if(month>9){

    }else{
      mois= "0"+month
    }
    const year = d.getFullYear();

    this.birthday = year + '-' + mois + '-' + jr;
    console.log(this.birthday)
  }

  matcher = new MyErrorStateMatcher();
  ajouter(firstName : string, lastName : string, motherName : string, phone : string, email : string){

    if(firstName === "" || lastName === "" || motherName === "" || phone === "" || this.birthday === "")
    {
      console.log("Vous devrez remplir tous les champs obligatoires*")
    } else {
      this.submitted = true;
      let familyDoctor = null
      let pharmacy = null
      let birth = this.birthday



      let user = JSON.parse(localStorage.getItem("currentUser"));
      this.userService.info_user(user["user_name"]).subscribe(
        rep => {
          console.log(rep)
          let pro : ProfessionalDto[] = [new ProfessionalDto(rep["id"], rep["firstName"],rep["lastName"], true)]
      let data = new PatientDto(null,null,firstName,lastName,birth,motherName,
        new ContactDto(null,phone,email,null),
        familyDoctor , pharmacy,pro
        ,true,null,null);
      let request = new Request(data);
      console.log(request)

          this.patientService.addPatient(request).pipe(first())
            .subscribe(
              dat => {
                let obj = JSON.parse(JSON.stringify(dat))
                if(obj.object != null){
                  this.patient_added = true;
                  console.log(dat)
                  this.exampleOutput.emit(data)
                  this.openSnackBar("Patient ajoute","Ok")
                }else {
                  this.error = obj.error.message
                }




              },
              error => {
                this.openSnackBar(error.error,"Ok")


              });







    })
    }
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 20000,

    })




}
}
