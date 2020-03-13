import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AppointmentDto} from "../../../../dto/AppointmentDto";
import {PatientDto} from "../../../../dto/patient/PatientDto";
import {DetailsRecoComponent} from "./details-reco/details-reco.component";

@Component({
  selector: 'app-recomandation',
  templateUrl: './recomandation.component.html',
  styleUrls: ['./recomandation.component.css']
})

export class RecomandationComponent {

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  RecoCtrlA = new FormControl();
  RecoCtrlS= new FormControl();
  RecoCtrlG = new FormControl();

  filteredRecoActions: Observable<string[]> = null;
  filteredRecoSedentaires: Observable<string[]> = null;
  filteredRecoGeneraux: Observable<string[]> = null;

  Reco: string[] = null
  Reco1: string[] = null
  Reco2: string[] = null
  allRecoActions : string[] = ['Augmenter le nombre de pas'];
  allRecoSedentaires : string[] = ['Se lever le plus souvent possible'];

  allRecoGeneraux: string[] = ['Augmenter les transports actifs à la marche'];
  Recom: recomandation[] = [

    {valeur :'Augmenter le nombre de pas', type: 1},
    {valeur :'Atteindre un nombre de minutes de marche',type: 1},
    {valeur :'Atteindre un nombre de pas',type:1},
    {valeur :'Mettre une alarme aux 30 minutes pour penser à se lever',type: 2},
    {valeur :'Se lever le plus souvent possible',type: 2},
    {valeur :'Réduire les minutes continues du temps assis',type: 2},
    {valeur :'faire un nombre de pas par minutes',type: 2},
    {valeur :'se lever pendants les pauses commerciales',type: 2},
    {valeur :'Augmenter les transports actifs à la marche',type: 3},
    {valeur :'Faire une liste des moments clés pour faire de l\'activité physique ',type: 3},
    {valeur :'S\'inscrire à un club/groupe de marche',type: 3},
    {valeur :'Écouter de la musique ou des livres audios en marchand',type: 3},
    {valeur :'Aller marcher avec quelqu\'un d\'autre',type: 3},
    {valeur :'Prévoir un plan B en cas d\'imprévus pour atteindre les objectifs',type: 3},
    {valeur :'Rechercher les infrastructures pour marcher dans votre environnement',type: 3},
    {valeur :'Référez-vous à une infirmière',type: 3},
    {valeur :'Référez-vous à un kinésiologue',type: 3},
    {valeur :'Référez-vous à un médecin de famille',type: 3}




  ];


  @ViewChild('RecoInput',{static : false}) RecoInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static : false}) matAutocomplete: MatAutocomplete;

  constructor(public dialogRef: MatDialogRef<RecomandationComponent>,public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data) {
    if(this.filteredRecoSedentaires == null && this.filteredRecoActions == null && this.filteredRecoGeneraux == null) {
      for (let i = 0; i < this.Recom.length; i++) {
        if (this.Recom[i].type === 1) {
          this.allRecoActions.push(this.Recom[i].valeur)
        }
        if (this.Recom[i].type === 2) {
          this.allRecoSedentaires.push(this.Recom[i].valeur)
        }
        if (this.Recom[i].type === 3) {
          this.allRecoGeneraux.push(this.Recom[i].valeur)
        }


      }
    }

    this.filteredRecoActions = this.RecoCtrlA.valueChanges.pipe(
      startWith(null),
      map((action: string | null) => action ? this._filter(action) : this.allRecoActions.slice()));
    this.filteredRecoSedentaires = this.RecoCtrlS.valueChanges.pipe(
      startWith(null),
      map((sedentaire: string | null) => sedentaire ? this._filterSedentaire(sedentaire) : this.allRecoSedentaires.slice()));
    this.filteredRecoGeneraux = this.RecoCtrlG.valueChanges.pipe(
      startWith(null),
      map((generaux: string | null) => generaux ? this._filterGeneraux(generaux) : this.allRecoGeneraux.slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our Recomandation
    if ((value || '').trim()) {
      if(this.Reco != null){
        this.Reco.push(value.trim());
      } else {
        this.Reco  = [value.trim()]
      }

    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.RecoCtrlA.setValue(null);
  }
  add1(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our Recomandation
    if ((value || '').trim()) {
      if(this.Reco1 != null){
        this.Reco1.push(value.trim());
      } else {
        this.Reco1 = [value.trim()]
      }

    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.RecoCtrlG.setValue(null);
  }
  add2(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our Recomandation
    if ((value || '').trim()) {
      if(this.Reco2 != null){
        this.Reco2.push(value.trim());
      } else {
        this.Reco2  = [value.trim()]
      }

    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.RecoCtrlS.setValue(null);
  }
  remove(reco: string): void {
    const index = this.Reco.indexOf(reco);

    if (index >= 0) {
      this.Reco.splice(index, 1);
    }
  }
  remove1(reco1: string): void {
    const index = this.Reco1.indexOf(reco1);

    if (index >= 0) {
      this.Reco1.splice(index, 1);
    }
  }
  remove2(reco2: string): void {
    const index = this.Reco2.indexOf(reco2);

    if (index >= 0) {
      this.Reco2.splice(index, 1);
    }
  }
  voir(){
    console.log("oui")
  }
  chipDetails(reco: string){
    const index = this.Reco.indexOf(reco);
    console.log("oui")
    const dialogRef = this.dialog.open(DetailsRecoComponent, {
      data : {reco : this.Reco[index], type : 1},
      width :'60%',
      height:'85%'
    });
  }
  chipDetails1(reco1 : string){
    console.log("oui")
    const index = this.Reco1.indexOf(reco1);
    console.log("oui")
    const dialogRef = this.dialog.open(DetailsRecoComponent, {
      data : {rec : this.Reco1[index], type : 3},
      width :'60%',
      height:'85%'
    });
  }
  chipDetails2(){
    console.log("oui")
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(this.Reco != null){
    this.Reco.push(event.option.viewValue);}
    else{
      this.Reco  = [event.option.viewValue]

    }
    this.RecoInput.nativeElement.value = '';
    this.RecoCtrlA.setValue(null);
  }
  selected1(event: MatAutocompleteSelectedEvent): void {
    if(this.Reco1 != null){
      this.Reco1.push(event.option.viewValue);}
    else{
      this.Reco1  = [event.option.viewValue]

  }
    console.log(this.Reco1)
    this.RecoInput.nativeElement.value = '';
    this.RecoCtrlG.setValue(null);
  }
  selected2(event: MatAutocompleteSelectedEvent): void {
    if(this.Reco2 != null){
      this.Reco2.push(event.option.viewValue);}
    else{
      this.Reco2  = [event.option.viewValue]

  }
    this.RecoInput.nativeElement.value = '';
    this.RecoCtrlS.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allRecoActions.filter(reco => reco.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterSedentaire(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allRecoSedentaires.filter(reco => reco.toLowerCase().indexOf(filterValue) === 0);
  }
  private _filterGeneraux(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allRecoGeneraux.filter(reco => reco.toLowerCase().indexOf(filterValue) === 0);
  }

}
export interface recomandation {
  valeur : string
  type : number


}
