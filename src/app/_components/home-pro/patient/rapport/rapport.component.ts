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
import { DatePipe } from '@angular/common'
import * as ss from 'simple-statistics'
import {AntecedentsDto} from "../../../../dto/medicalfile/AntecedentsDto";
import {ClinicalExaminationDto} from "../../../../dto/medicalfile/clinical_examination/ClinicalExaminationDto";
import {LipidProfileDto} from "../../../../dto/medicalfile/LipidProfileDto";
import {MedicalFileHistoryDto} from "../../../../dto/medicalfile/MedicalFileHistoryDto";
import {MedicalFileDto} from "../../../../dto/medicalfile/MedicalFileDto";



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
  list_sedentary = [];
  list_lowIntesity = [];
  list_hightIntensity = [];
  list_mediumIntensity = [];
  minutesDate : string [] = []
  poddon: any
  stepsDate: string [] = [];
  mySubscription: any
  datess = new Array()
  visites: AppointmentDto[];
  public patientRow: Patient[] = [];
  public stats: DescStats [];
  public quiz : any
  public travail : number
  public val : Resultat [] = []
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  public vigoureux = 0;

  public moderee = 0;

  public marche = 0;

  public sedentaire = 0;
  clinicalExamination : ClinicalExaminationDto []
  lipidProfiles : LipidProfileDto[]
  medicalFileHistory : MedicalFileHistoryDto [] = null
  medicalFile : MedicalFileDto

  public lineChartData: ChartDataSets[] ;
  public lineChartLabels: Label[] ;
  public lineChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgb(0,255,225)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  public lineChartLabelst: Label[] ;
  public lineChartOptionst = {
    responsive: true,
  };
  public lineChartDatat: ChartDataSets[] ;

  public lineChartColorst: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'blue',
    },
  ];
  public lineChartLegendt = true;
  public lineChartTypet = 'line';
  public lineChartPluginst = [];

  barChartLabels: Label[] = this.stepsDate;
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    {data: [], label: 'Nombre de pas par jour'}
  ];

  public dataSource = new MatTableDataSource<DescStats>();

  statis: DescStats[] = [];
  public displayedColumns: string[] = [
    'Minutes',
    'Maximum',
    'Minimum',
    'Moyenne',
    'Mediane',
    'Variance',
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


  public barChartLabelsgpaq: Label[] = [];
  public barChartTypegpaq: ChartType = 'bar';
  public barChartLegendgpaq = true;
  public barChartPluginsgpaq = [];

  public barChartDatagpaq: ChartDataSets[] = [] ;
  constructor(private  patientService: PatientService, private router: Router,public datepipe: DatePipe) {


    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    this.visites = []
    this.steps = []
    this.stepsDate = []
    this.minData = []
    this.minData = []




  }

  ngOnDestroy() {

  }

  ngOnInit() {
    this.medicalFile = this.patient.medicalFile
    this.clinicalExamination = this.medicalFile.clinicalExamination






    this.visites = []
    this.steps = []
    this.stepsDate = []
    this.minData = []
    this.minData = []
    this.getAllVisites()




  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.lineChartLabels = ["j1","j2","j3"];
    // this.lineChartData = [58,62,60];

    this.visites = []
    this.steps = []
    this.stepsDate = []
    this.minData = []
    this.minData = []
    this.clinicalExamination = this.medicalFile.clinicalExamination
    console.log(this.medicalFile.clinicalExamination + " clinical")
    this.getAllVisites()






  }

  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mattab($event){
    this.getAllVisites()
  }
  public getSteps = () => {
    let request = new Request(this.datess)

    this.patientService.getSteps(this.patient.medicalFile.patient, request).subscribe(steps => {
      this.steps = []
      this.stepsDate = []
      this.canvaData = []
      let poddon = JSON.parse(JSON.stringify(steps)) as Request
      if(poddon.object!=null){
        for (let i = 0; i < this.visites.length; i++) {
          this.canvaData.push(poddon.object[this.datepipe.transform(this.visites[i].appointmentDate.toString(), 'yyyy-MM-dd')])
        }

        for (let x of this.canvaData) {
          for (let i in x) {
            let date = new Date(x[i].date)
            let options = {
              year: 'numeric', month: 'numeric', day: 'numeric',
            };

            this.stepsDate.push(date.toLocaleDateString('fr', options))
            this.steps.push(x[i].steps)
            this.barChartData = [
              {data: this.steps, label: 'Nombre de pas par jour'}
            ];
            this.barChartLabels = this.stepsDate;


          }




        }
      }else {
        this.steps = []
        this.stepsDate = []
        this.barChartData = [
          {data:[], label: 'Nombre de pas par jour'}
        ];
        this.barChartLabels = this.stepsDate;
      }


      //this.list_dates = [JSON.parse(steps)]


    }, error => {
      this.steps = []
      this.stepsDate = []
      this.canvaData = []
      this.barChartData = [
        {data: this.steps, label: 'Nombre de pas par jour'}
      ];
      this.barChartLabels = this.stepsDate;
      console.log("ahah")
    });
  }
  public getQuiz = () => {
    this.patientService.getQuiz(this.patient.id).subscribe( quiz => {
      console.log(quiz)
      quiz = JSON.parse(JSON.stringify(quiz))
      console.log(quiz)
      this.quiz = quiz
      console.log(this.quiz)
    })

    for( let x of this.quiz.object){
      let valeur = JSON.parse(x.value)
      for(let i = 0 ; i< valeur.reponses.length; i++){
        if((valeur.reponses[i].hr === null || valeur.reponses[i].hr === undefined ) && x.type === "GPAQ" ){
          valeur.reponses[i].hr = 0;
        }
        if((valeur.reponses[i].minu === null || valeur.reponses[i].minu === undefined ) && x.type === "GPAQ" ){
          valeur.reponses[i].minu = 0;
        }
        if((valeur.reponses[i].jr === null || valeur.reponses[i].jr === undefined ) &&  x.type === "GPAQ"){
          valeur.reponses[i].jr = 0;
        }
      }
      /*  Vigoureux = (rép Q2xrép Q3) + (rép Q14xrép Q15) en minutes

  Modérée = (rép Q5xrép Q6) + (rép Q11xrép Q12) + (rép Q17xrép Q18) en minutes

  Marche = (rép Q20xrép Q21) + (rép Q8xrép Q9) en minutes

  Sédentaire = rép Q22 en minutes*/
      this.vigoureux = (valeur.reponses[1].jr * (valeur.reponses[2].hr * 60 + valeur.reponses[2].minu)) +
        (valeur.reponses[13].jr * (valeur.reponses[14].hr * 60 + valeur.reponses[14].minu));
      this.moderee = (valeur.reponses[4].jr * (valeur.reponses[5].hr * 60 + valeur.reponses[5].minu)) +
        (valeur.reponses[10].jr * (valeur.reponses[11].hr * 60 + valeur.reponses[11].minu)) +
        (valeur.reponses[16].jr * (valeur.reponses[17].hr * 60 + valeur.reponses[17].minu));
    /*  this.marche = (valeur.reponses[19].jr * (valeur.reponses[20].hr * 60 + valeur.reponses[20].minu)) +
        (valeur.reponses[7].jr * (valeur.reponses[8].hr * 60 + valeur.reponses[8].minu))*/
     // this.sedentaire = (valeur.reponses[21].jr * (valeur.reponses[22].hr * 60 + valeur.reponses[22].minu));
      this.barChartDatagpaq =  [
        { data: [this.vigoureux,0], label: 'Vigoureux' },
        { data: [this.moderee,0], label: 'Moderee' },
        { data: [this.marche,0], label: 'Marche' },
        { data: [this.sedentaire,0], label: 'Sedentaire' }
      ];


      console.log(valeur.reponses[1].hr)
      this.val.push( { date :x.date, value : valeur, id : x.id, type: x.type})
      console.log(this.val)

    }


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
          this.minData.push(min.object[this.datepipe.transform(this.visites[i].appointmentDate.toString(), 'yyyy-MM-dd')])
          console.log(this.visites[i].appointmentDate.toString())
          console.log(this.datepipe.transform(this.visites[i].appointmentDate.toString(), 'yyyy-MM-dd'))
        }
        console.log(this.minData)
        for (let x of this.minData) {
          console.log(x)
          for (let i in x) {
            let date = new Date(x[i].date)
            let options = {
              year: 'numeric', month: 'numeric', day: 'numeric',
            };
            this.list_sedentary.push(x[i].sedentary)
            this.list_hightIntensity.push(x[i].very_active)
            this.list_mediumIntensity.push(x[i].fairly_active)
            this.list_lowIntesity.push(x[i].lightly_active)
            this.statis = [
              new DescStats("Intensité faible", +ss.max(this.list_lowIntesity).toFixed(2), +ss.min(this.list_lowIntesity).toFixed(2), +ss.average(this.list_lowIntesity).toFixed(2), +ss.median(this.list_lowIntesity).toFixed(2), +ss.variance(this.list_lowIntesity).toFixed(2), +ss.standardDeviation(this.list_lowIntesity).toFixed(2)),
              new DescStats("Intensité modérée", +ss.max(this.list_mediumIntensity).toFixed(2), +ss.min(this.list_mediumIntensity).toFixed(2), +ss.average(this.list_mediumIntensity).toFixed(2), +ss.median(this.list_mediumIntensity).toFixed(2), +ss.variance(this.list_mediumIntensity).toFixed(2), +ss.standardDeviation(this.list_mediumIntensity).toFixed(2)),
              new DescStats("Intensité elevée", +ss.max(this.list_hightIntensity).toFixed(2), +ss.min(this.list_hightIntensity).toFixed(2), +ss.average(this.list_hightIntensity).toFixed(2), +ss.median(this.list_hightIntensity).toFixed(2), +ss.variance(this.list_hightIntensity).toFixed(2), +ss.standardDeviation(this.list_hightIntensity).toFixed(2)),
              new DescStats("Sedentaires", +ss.max(this.list_sedentary).toFixed(2), +ss.min(this.list_sedentary).toFixed(2), +ss.average(this.list_sedentary).toFixed(2), +ss.median(this.list_sedentary).toFixed(2), +ss.variance(this.list_sedentary).toFixed(2), +ss.standardDeviation(this.list_sedentary).toFixed(2))
            ]

            this.dataSource.data = this.statis;
            this.minutesDate.push(date.toLocaleDateString('fr', options))
            this.minu_hight = x[i].very_active + this.minu_hight
            this.minu_low = x[i].lightly_active + this.minu_low
            this.minu_medium = x[i].fairly_active + this.minu_medium

            this.sedentary = x[i].sedentary + this.sedentary


          }



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
    this.getQuiz()
    let poids : number [] = []
    let trtaille : number [] = []
    let dates : string[] = []
    let i = 0;
    while(i<this.patient.medicalFile.clinicalExamination.length){
      poids.push(+this.patient.medicalFile.clinicalExamination[i].anthropometry.weight.toFixed(2))
      trtaille.push(+this.patient.medicalFile.clinicalExamination[i].anthropometry.waist.toFixed(2))
      dates.push(this.patient.medicalFile.clinicalExamination[i].date)
      console.log(this.patient.medicalFile.clinicalExamination[i].anthropometry.weight)
      console.log(poids[i])
      console.log(this.patient.medicalFile.clinicalExamination.length)
      console.log(i)
      i++;
    }
    this.lineChartData= [
      { data: poids, label: 'Poids' },
    ];
    this.lineChartDatat= [
      { data: trtaille, label: 'Tour de taille' },
    ];
    this.lineChartLabels = dates
    console.log(this.patient)
    this.patientService.getRdv(this.patient.id).subscribe(patients => {
      //let tabusers = JSON.parse(JSON.stringify(users.toString()))

      this.visites = JSON.parse(JSON.stringify(patients)).object as AppointmentDto[]
      console.log(this.visites)
      if(this.visites.length > 0){
        for (let i = 0; i < this.visites.length; i++) {
          this.datess.push(Date.parse(this.visites[i].appointmentDate+""))
          console.log(this.datess)
        }
        this.getSteps()
        this.getMinutes()
      }else {
        this.steps = []
        this.stepsDate = []
        this.minData = []
        this.minData = []

        this.pieChartData = [this.minu_low, this.minu_medium, this.minu_hight, this.sedentary]
        this.barChartData = [
          {data: this.steps, label: 'Nombre de pas par jour'}
        ];

      }


    }, error => {
      this.visites = []
      this.steps = []
      this.stepsDate = []
      this.minData = []
      this.minData = []

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
export interface Resultat {
  date : string,
  value : object
  id: string
  type : string
}
