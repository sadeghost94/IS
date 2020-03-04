import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PatientloginComponent} from "./patientlogin/patientlogin.component";
import {PagepatientComponent} from "./pagepatient.component";
import {BreqComponent} from "./Breq/breq.component";


const pagePatientRoutes: Routes = [
  {
    path: '',
    component: PagepatientComponent,
    children: [
      {
        path: '',
        component: PagepatientComponent,

      },
      {path: 'breq', component: BreqComponent}

    ],

  }


];

@NgModule({
  imports: [RouterModule.forChild(pagePatientRoutes)],
  exports: [RouterModule]
})
export class PagePatientRoutingModule {
}
