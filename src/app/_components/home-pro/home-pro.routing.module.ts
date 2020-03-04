import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {HomeProComponent} from "./home-pro.component";
import {PatientComponent} from "./patient/patient.component";
import {AddpatientComponent} from "./patient/addpatient/addpatient.component";
import {ListPatientsComponent} from "./patient/list-patients/list-patients.component";
import {RecomandationComponent} from "./patient/recomandation/recomandation.component";

const homeProRoutes: Routes = [
  {
    path: '',
    component: HomeProComponent,
    children: [
      {
        path: '',
        component: HomeProComponent
      },
      { path: 'patient', component: PatientComponent},
      { path: 'addpatient', component: AddpatientComponent },
      { path: 'listpatient', component: ListPatientsComponent },

      { path: 'reco', component: RecomandationComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(homeProRoutes)],
  exports: [RouterModule]
})
export class HomeProRoutingModule{ }
