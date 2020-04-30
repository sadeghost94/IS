import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeProComponent} from "./home-pro.component";
import {PatientComponent} from "./patient/patient.component";
import {AddpatientComponent} from "./patient/addpatient/addpatient.component";
import {ListPatientsComponent} from "./patient/list-patients/list-patients.component";
import {RecomandationComponent} from "./patient/recomandation/recomandation.component";
import { AppointComponent } from './patient/patient-profile/appoint/appoint.component';
import {LogiComponent} from "./patient/list-patients/appoint/logi.component";
import { DetailsRecoComponent } from './patient/recomandation/details-reco/details-reco.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MaterialModule} from "../../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { BilanLipidiqueComponent } from './patient/bilan-lipidique/bilan-lipidique.component';
import { HistoireSanteComponent } from './patient/histoire-sante/histoire-sante.component';

export const homeProRoutes: Routes = [
  {
    path: '',
    component: HomeProComponent,
    children: [
      {
        path: '',
        component: ListPatientsComponent
      },
      { path: 'patient', component: PatientComponent},
      { path: 'addpatient', component: AddpatientComponent },
      { path: 'listpatient', component: ListPatientsComponent },
      { path: 'logi', component: LogiComponent },

      { path: 'reco', component: HistoireSanteComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(homeProRoutes), MatRadioModule, MatFormFieldModule, MaterialModule, FormsModule, CommonModule, ReactiveFormsModule],
    exports: [RouterModule, HistoireSanteComponent],
  declarations: [AppointComponent, DetailsRecoComponent, BilanLipidiqueComponent, HistoireSanteComponent]
})
export class HomeProRoutingModule{ }
