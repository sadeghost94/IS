import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {UserRequestDto} from "../../../../dto";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {PatientDto} from "../../../../dto/patient/PatientDto";

@Component({
  selector: 'app-list-visites',
  templateUrl: './list-visites.component.html',
  styleUrls: ['./list-visites.component.css']
})
export class ListVisitesComponent implements OnInit {
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  patients : any[];
  public displayedColumns = ['nom', 'date', 'description'
  ];
  public dataSource = new MatTableDataSource<PatientDto>();
  currentUser = localStorage.getItem("currentUser");
  constructor(private router : Router) {
    if (localStorage.getItem("currentRole" ) === "role_professional") {


    }else{
      this.router.navigate(['/']);

    }

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
    /*this.userService.getData('api/owner')
      .subscribe(res => {
        this.dataSource.data = res as Owner[];
      })*/
    this.patients = [ new PatientDto(null,"visite 1","12/12/2020","premiere visite ",null,null,null, null, null,null,null,null,null)


    ]
    this.dataSource.data = this.patients;
    // console.log("yes "+this.users)
  }

  public redirectToDetails = (id: string) => {

  }

  public redirectToUpdate = (element: UserRequestDto) => {

}
}
