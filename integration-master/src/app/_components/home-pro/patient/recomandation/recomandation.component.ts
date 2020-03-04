import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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
  RecoCtrl = new FormControl();
  filteredReco: Observable<string[]>;
  Reco: string[] = ['Chaque séance d’activité physique doit durer au moins dix minutes.'];
  allReco: string[] = ['Soyez actif au moins 2 heures et demie par semaine pour en retirer des bienfaits pour la santé.',
    'Mettez l’accent sur l’activité aérobique d’intensité modérée à élevée répartie tout au long de la semaine en séances de dix minutes ou plus chacune.',
    'Améliorez votre tonus en ajoutant, au moins deux jours par semaine, des activités qui travaillent les muscles et les os.',
    'Choisissez un éventail d’activités physiques qui vous plaisent. Essayez plusieurs activités jusqu’à ce que vous trouviez celles qui vous conviennent le mieux.',
    'Établissez une routine : allez à la piscine ou au gymnase, inscrivez-vous à un cours de cardiovélo, fixez-vous un horaire de course à pied et de séances d’exercice structurées. Ajoutez un volet social en invitant quelqu’un à se joindre à vous.',
    'Préférez les modes de transport actifs pour vos déplacements. Chaque fois que c’est possible, laissez la voiture à la maison et optez pour la marche, le vélo ou la course.'


  ];

  @ViewChild('RecoInput',{static : false}) RecoInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static : false}) matAutocomplete: MatAutocomplete;

  constructor() {
    this.filteredReco = this.RecoCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allReco.slice()));
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our Recomandation
    if ((value || '').trim()) {
      this.Reco.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.RecoCtrl.setValue(null);
  }

  remove(reco: string): void {
    const index = this.Reco.indexOf(reco);

    if (index >= 0) {
      this.Reco.splice(index, 1);
    }
  }
  voir(){
    console.log("oui")
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.Reco.push(event.option.viewValue);
    this.RecoInput.nativeElement.value = '';
    this.RecoCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allReco.filter(reco => reco.toLowerCase().indexOf(filterValue) === 0);
  }

}
