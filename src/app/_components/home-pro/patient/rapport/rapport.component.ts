import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DescStats} from "../../../../_models/DescStats";
import {MatTableDataSource} from "@angular/material/table";
import {Patient} from "../../../../_models/patient";
import {Color, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from "ng2-charts";
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {AppointmentDto} from "../../../../dto/AppointmentDto";
import {PatientService} from "../../../../_services/patient.service";
import {PatientDto} from "../../../../dto/patient/PatientDto";
import {NavigationEnd, Router} from "@angular/router";
import {Request} from "../../../../dto";

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit, OnChanges {
  tabIndex = 0;
  @Input() patient: PatientDto
  afficher;
  canvaData: Steps [] = []
  minData: Minutes [] = []
  steps: number[] = []
  minu_hight: number ;
  minu_low: number ;
  sedentary: number ;
  minu_medium: number ;
  minutesDate : string [] = []
  poddon: any
  stepsDate: string [] = [];
  mySubscription: any
  datess = new Array()
  visites: AppointmentDto[];
  public patientRow: Patient[] = [];
  public stats: DescStats [];
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartLabels: string[] = [];
  public lineChartData: number[] = [];
  public lineChartType = 'line';
  lineChartOptions = {
    responsive: true,
  };

  barChartLabels: Label[] = this.stepsDate;
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    {data: this.steps, label: 'Nombre de pas par jour'}
  ];

  public dataSource = new MatTableDataSource<DescStats>();

  statis: DescStats[] = [];
  public displayedColumns: string[] = [
    'name',
    'max',
    'min',
    'average',
    'median',
    'variance',
    'sd'
  ];
  public pieChartType = 'pie';
  public pieChartLabels: string[] = ['Intensité faible',
    'Intensité  modérée',
    'Intensité élevée',
   "sedentaires"];
  public pieChartData: SingleDataSet = [this.minu_low, this.minu_medium, this.minu_hight] ;
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private  patientService: PatientService, private router: Router) {

    this.statis = [new DescStats("Intensité faible", 50, 10, 26, 15, 14, 12),
      new DescStats("Intensité  modérée", 13, 14, 11, 10, 5, 5),
      new DescStats("Intensité élevée", 13, 14, 11, 10, 5, 5)
    ]

    this.dataSource.data = this.statis;
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.datess = []
    this.canvaData = []
    this.minData = []




  }

  ngOnDestroy() {

  }

  ngOnInit() {
    this.datess = []
    this.canvaData = []
    this.minData = []
    this.getAllVisites()




  }

  ngOnChanges(changes: SimpleChanges): void {
    this.lineChartLabels = ["j1","j2","j3"];
    this.lineChartData = [58,62,60];
    this.datess = []
    this.canvaData = []
    this.minData = []
    this.getAllVisites()




  }

  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public getSteps = () => {
    let request = new Request(this.datess)
    this.steps = []
    this.stepsDate = []
    this.patientService.getSteps(this.patient.medicalFile.patient, request).subscribe(steps => {
      let poddon = JSON.parse(JSON.stringify(steps)) as Request
      if(poddon.object!=null){
        for (let i = 0; i < this.visites.length; i++) {
          this.canvaData.push(poddon.object[this.visites[i].appointmentDate])
        }


      for (let x of this.canvaData) {
        console.log(x)
        for (let i in x) {
          console.log(x[i].date)
          let date = new Date(x[i].date)
          let options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
          };
          console.log(date.toLocaleDateString('fr', options))

            this.stepsDate.push(date.toLocaleDateString('fr', options))
            this.steps.push(x[i].steps)
          this.barChartData = [
            {data: this.steps, label: 'Nombre de pas par jour'}
          ];
          this.barChartLabels = this.stepsDate;


        }
        console.log(this.steps)
        console.log(this.stepsDate)




      }
      }else {
        this.steps = []
        this.stepsDate = []
        this.barChartData = [
          {data: this.steps, label: 'Nombre de pas par jour'}
        ];
        this.barChartLabels = this.stepsDate;
      }


      //this.list_dates = [JSON.parse(steps)]


    }, error => {
       this.steps = []
      this.stepsDate = []
      this.barChartData = [
        {data: this.steps, label: 'Nombre de pas par jour'}
      ];
      this.barChartLabels = this.stepsDate;
      console.log("ahah")
    });
  }
  public getMinutes = () => {

    let request = new Request(this.datess)
    this.patientService.getMinutes(this.patient.medicalFile.patient, request).subscribe(minutes => {
      this.minu_hight = 0;
      this.minu_medium = 0
      this.minu_low = 0;
      this.sedentary = 0;
      let min = JSON.parse(JSON.stringify(minutes)) as Request
      if(min.object != null)
      {
      for (let i = 0; i < this.visites.length; i++) {
        this.minData.push(min.object[this.visites[i].appointmentDate])
      }
      for (let x of this.minData) {
        console.log(x)
        for (let i in x) {
          console.log(x[i].date)
          let date = new Date(x[i].date)
          let options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
          };
          console.log(date.toLocaleDateString('fr', options))

          this.minutesDate.push(date.toLocaleDateString('fr', options))
          this.minu_hight = x[i].very_active + this.minu_hight
          this.minu_low = x[i].lightly_active + this.minu_low
          this.minu_medium = x[i].fairly_active + this.minu_medium
          this.sedentary = x[i].sedentary + this.sedentary



        }
        console.log(this.steps)
        console.log(this.stepsDate)



      }

      this.pieChartData = [this.minu_low, this.minu_medium, this.minu_hight, this.sedentary]
     console.log(minutes)
        }else {
        this.minu_hight = 0;
        this.minu_medium = 0
        this.minu_low = 0;
        this.sedentary = 0
        this.pieChartData = [this.minu_low, this.minu_medium, this.minu_hight, this.sedentary]
      }
    }, error => {
      this.minu_hight = 0;
      this.minu_medium = 0
      this.minu_low = 0;
      this.sedentary = 0
      this.pieChartData = [this.minu_low, this.minu_medium, this.minu_hight, this.sedentary]
    });
  }
  public getAllVisites = () => {
    console.log(this.patient)
    this.patientService.getRdv(this.patient.id).subscribe(patients => {
      //let tabusers = JSON.parse(JSON.stringify(users.toString()))

      this.visites = JSON.parse(JSON.stringify(patients)).object as AppointmentDto[]
      if(this.visites.length >0 ){
        for (let i = 0; i < this.visites.length; i++) {
          this.datess.push(Date.parse(this.visites[i].appointmentDate))
        }
        this.getSteps()
        this.getMinutes()
      }else {

        this.steps = []
        this.stepsDate = []
      }


    });
  }


}

export interface Steps {
  date: number;
  medicaleFileId: string;
  steps: number;
}
export interface Minutes {
  date: number;
  medicaleFileId: string;
  sedentary: number;
  lightly_active: number;
  fairly_active: number;
  very_active: number;
}
