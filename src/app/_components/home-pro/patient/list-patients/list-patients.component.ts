import {Component, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {UserRequestDto} from "../../../../dto";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

import {BreakpointObserver} from "@angular/cdk/layout";
import {Router} from "@angular/router";
import {PatientService} from "../../../../_services/patient.service";
import {PatientDto} from "../../../../dto/patient/PatientDto";
import {AddpatientComponent} from "../addpatient/addpatient.component";

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})

export class ListPatientsComponent implements OnInit {
  patients : PatientDto[] ;
  patient = false;
  newPatient;
  addpatient = false;
  id : string;
  idante : string;
  exam = false;
  ante = false;
  socio = false;
  podo  = false;
  showProfile = false;
  blocK_checked : boolean = false ;
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(AddpatientComponent,{static: false}) myChild;


  public displayedColumns = ['numero_dossier', 'nom', 'Action'
  ];
  public dataSource = new MatTableDataSource<PatientDto>();
  currentUser = localStorage.getItem("currentUser");
  constructor(private router : Router, private patientService : PatientService) {
    if (localStorage.getItem("currentRole" ) === "role_professional") {


    }else{
      this.router.navigate(['/']);

    }

  }
  ngOnChanges(changes: SimpleChanges) {

  }

  ajouter(){
    this.addpatient = true;
    this.showProfile = false;
    this.exam = false;
    this.ante = false;
    this.socio = false;
    this.podo  = false;



  }
  refresh_list($event){
    console.log($event)
    this.newPatient = $event
    this.getAllUsers()


  }
  show_profile(id: string){
    this.id = id;
    this.addpatient = false;
    this.showProfile = true;
    this.exam = false;
    this.ante = false;
    this.socio = false;
    this.podo  = false;




  }
  show_exam(id : string){
    this.addpatient = false;
    this.showProfile = false;
    this.exam = true;
    this.ante = false;
    this.socio = false;
    this.podo  = false;
    this.id = id;





  }
  add_antedant(id: string){
    this.addpatient = false;
    this.showProfile = false;
    this.exam = false;
    this.ante = true;
    this.socio = false;
    this.podo  = false;
    console.log(id)
    this.id = id;





  }
  add_socio(id : string){
    console.log(id)
    this.id = id;
    this.addpatient = false;
    this.showProfile = false;
    this.exam = false;
    this.ante = false;
    this.socio = true;
    this.podo  = false;




  }
  show_podo (id: string){
    this.id = id;

    this.addpatient = false;
    this.showProfile = false;
    this.exam = false;
    this.ante = false;
    this.socio = false;
    this.podo  = true;


  }


  ngOnInit() {
    this.getAllUsers();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  public getAllUsers = () => {

    this.patientService.getAll().subscribe( patients => {
      // let tabusers = JSON.parse(JSON.stringify(users.toString()))
      let pat = JSON.parse(JSON.stringify(patients))
      console.log(pat)
      this.dataSource.data = pat.object as PatientDto[]
      this.dataSource.data.push(this.newPatient)


    });
    // console.log("yes "+this.users)
  }

  public redirectToDetails = (id: string) => {
    this.patient = true;

  }

  public redirectToUpdate = (element: UserRequestDto) => {
    let obj = JSON.parse(JSON.stringify(element))
    console.log(obj.account.enabled)
    if(element.account.enabled === false){
      this.blocK_checked = true;

      console.log(this.blocK_checked)
    }else{
      this.blocK_checked = false;
      console.log(this.blocK_checked)

    }
    //this.userService.block(element, this.blocK_checked).subscribe();

  }


}
