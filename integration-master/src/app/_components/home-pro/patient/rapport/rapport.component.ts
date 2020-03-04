import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DescStats} from "../../../../_models/DescStats";
import {MatTableDataSource} from "@angular/material/table";
import {Patient} from "../../../../_models/patient";
import {Color, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from "ng2-charts";
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit, OnChanges  {
  tabIndex = 0;
  afficher ;
  public patientRow: Patient[] = [];
  public stats : DescStats [];
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Jour 1', 'Jour 2', 'Jour 3', 'Jour 4\'', 'Jour 5\'', 'Jour 6\'', 'Jour 7\''];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
      { data: [450, 900, 1000, 1500, 5000, 10000, 6000], label: 'Nombre de pas par jour' }
  ];
  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Poids en KG' },
  ];
  lineChartData_fcrepos: ChartDataSets[] = [
    { data: [30, 35, 40, 35, 20, 75], label: 'par minute' },
  ];

  lineChartLabels: Label[] = ['Viste1', 'visite 2', 'Visite 3', 'Visite 4', 'Visite 5', 'Visite 6'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';


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
  public pieChartLabels: string[] = ['Minutes lightly active',
    'Minutes fairly active',
    'Minutes very active'];
  public pieChartData: SingleDataSet = [30, 50, 20];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  constructor() {


    this.statis =  [ new DescStats("Minutes lightly active", 50,10,26,15,14,12),
      new DescStats("Minutes fairly active", 13,14,11,10,5,5),
      new DescStats("Minutes very active", 13,14,11,10,5,5)
    ]

    this.dataSource.data = this.statis;
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  public chartClicked(e: any): void {
  }
  public chartHovered(e: any): void {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
