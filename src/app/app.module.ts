import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserIdleModule } from 'angular-user-idle';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

import {MatSelectionList} from '@angular/material/list';

import { DatePipe } from '@angular/common'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module'
import { LoginComponent } from './_components/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MainNavComponent } from './_components/home/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { OAuthModule } from 'angular-oauth2-oidc';
import {MatInputModule} from "@angular/material";
import { Error404Component } from './_components/error404/error404.component';
import {RegisterComponent} from "./_components/register/register.component";
import {HomeComponent} from "./_components/home/home.component";
import {ProfileComponent} from "./_components/profile/profile.component";
import {PatientComponent} from "./_components/home-pro/patient/patient.component";
import { ForgetpasswordComponent } from './_components/forgetpassword/forgetpassword.component';
import { ConfirmaccountComponent } from './_components/confirmaccount/confirmaccount.component';
import {MatSnackBar} from "@angular/material";
import { ResetpasswordComponent } from './_components/resetpassword/resetpassword.component';
import {InviteComponent} from "./_components/home/invite/invite.component";
import {MainNavProfComponent} from "./_components/home-pro/patient/main-nav-prof/main-nav-prof.component";
import { MainNavModuleProf} from "./_components/home-pro/patient/main-nav-prof/main-nav.module-prof";
import { HomeProComponent } from './_components/home-pro/home-pro.component';
import { ListUsersComponent } from './_components/home/list-users/list-users.component';
import { HomeseaComponent } from './_components/homesea/homesea.component';
import {MainNavSeaComponent} from "./_components/homesea/main-nav-sea/main-nav-sea.component";
import { RechercheComponent } from './_components/homesea/recherche/recherche.component';
import { ListPatientsComponent } from './_components/home-pro/patient/list-patients/list-patients.component';
import {PatientProfileComponent} from './_components/home-pro/patient/patient-profile/patient-profile.component';
import { AddpatientComponent } from './_components/home-pro/patient/addpatient/addpatient.component';
import { ExamencliniqueComponent } from './_components/home-pro/patient/examenclinique/examenclinique.component';
import { SociodemoComponent } from './_components/home-pro/patient/sociodemo/sociodemo.component';
import { AntecedantsComponent } from './_components/home-pro/patient/antecedants/antecedants.component';
import { SchedulerModule } from '@progress/kendo-angular-scheduler';
import { ListVisitesComponent } from './_components/home-pro/patient/list-visites/list-visites.component';
import { RapportComponent } from './_components/home-pro/patient/rapport/rapport.component';
import { AffectpodometreComponent } from './_components/home-pro/patient/affectpodometre/affectpodometre.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { DevicesComponent } from './_components/home/devices/devices.component';
import { RecomandationComponent } from './_components/home-pro/patient/recomandation/recomandation.component';
import { PagepatientComponent } from './_components/pagepatient/pagepatient.component';
import { PatientloginComponent } from './_components/pagepatient/patientlogin/patientlogin.component';
import {BreqComponent} from "./_components/pagepatient/Breq/breq.component";
import {QuizComponent} from "./_components/pagepatient/Breq/quiz/quiz.component";
import {ModalModule} from "./_components/_modal";
import {CreaterdvComponent} from "./_components/createrdv/createrdv.component";
import {RdvComponent} from "./_components/home-pro/rdv/rdv.component";
import {HomeRoutingModule} from "./_components/home/home-routing.module";
import {HomeProRoutingModule} from "./_components/home-pro/home-pro.routing.module";
import {HomeSeaRoutingModule} from "./_components/homesea/homesea.routing.module";
import {PagePatientRoutingModule} from "./_components/pagepatient/pagepatient.routing";
import {LogiComponent} from "./_components/home-pro/patient/list-patients/appoint/logi.component";
import {AddDialogComponent} from "./_components/dialogs/add/add.dialog.component";
import {DeleteDialogComponent} from "./_components/dialogs/delete/delete.dialog.component";
import {EditDialogComponent} from "./_components/dialogs/edit/edit.dialog.component";
import {DetailsRecoComponent} from "./_components/home-pro/patient/recomandation/details-reco/details-reco.component";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {ErrorInterceptor} from "./_helpers";
import {BnNgIdleService} from "bn-ng-idle";
import {EncrDecrService} from "./_services/EncrDecrService";
import { IddleUserComponent } from './_components/iddle-user/iddle-user.component';
import {Idle} from "@ng-idle/core";
import {NgIdleKeepaliveModule} from "@ng-idle/keepalive";
import {BilanLipidiqueComponent} from "./_components/home-pro/patient/bilan-lipidique/bilan-lipidique.component";
import {SociodemoComponentPatient} from "./_components/pagepatient/sociodemopatient/sociodemo-component-patient.component";
import { RecomandationPatientComponent } from './_components/pagepatient/recomandation-patient/recomandation-patient.component';
import { GpaqComponent } from './_components/pagepatient/gpaq/gpaq.component';
import {GpaqQuizComponent} from "./_components/pagepatient/gpaq/quiz/quiz.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {TwoDigitDecimaNumberDirective} from "./_components/home-pro/patient/examenclinique/two-digit-decima-number.directive";
import {OptionComponent} from "./_components/home-pro/patient/histoire-sante/option/option.component";
import {MatCardModule} from "@angular/material/card";
import {DateTimePickerModule} from "@syncfusion/ej2-angular-calendars";




@NgModule({
  declarations: [
    AppComponent,
    TwoDigitDecimaNumberDirective,
    MainNavSeaComponent,
    LoginComponent,
    Error404Component,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    PatientComponent,
    MainNavComponent,
    DevicesComponent,
    ListPatientsComponent,
    ForgetpasswordComponent,
    ConfirmaccountComponent,
    ResetpasswordComponent,
    MainNavProfComponent,
    HomeProComponent,
    ListUsersComponent,
    HomeseaComponent,
    RechercheComponent,
    PatientProfileComponent,
    AddpatientComponent,
    ExamencliniqueComponent,
    SociodemoComponent,
    SociodemoComponentPatient,
    AntecedantsComponent,
    ListVisitesComponent,
    RapportComponent,
    AffectpodometreComponent,
    RecomandationComponent,
    PagepatientComponent,
    PatientloginComponent,
    InviteComponent,
    BreqComponent,
    QuizComponent,
    CreaterdvComponent,
    RdvComponent,
    LogiComponent,
    AddDialogComponent,
    DeleteDialogComponent,
    EditDialogComponent,
    IddleUserComponent,
    RecomandationPatientComponent,
    GpaqComponent,
    GpaqQuizComponent



  ],
  imports: [
    BrowserModule,
    FormsModule , MatCardModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    UserIdleModule.forRoot({idle: 600, timeout: 10, ping: 30}),
    AngularFireModule.initializeApp(environment.firebase),
    ModalModule,
    FlexLayoutModule,
    HomeRoutingModule,
    HomeProRoutingModule,
    HomeSeaRoutingModule,
    PagePatientRoutingModule,
    FormsModule,
    DateTimePickerModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    RouterModule,
    MatInputModule,
    NgMaterialMultilevelMenuModule,
    MainNavModuleProf,
    RouterModule,
    ChartsModule,
    MatDialogModule,
    RouterModule,
    NgIdleKeepaliveModule.forRoot(),
    OAuthModule.forRoot(),

    SchedulerModule,
    MatButtonToggleModule
  ],
//

  providers: [EncrDecrService,DatePipe,
   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },

   //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  entryComponents: [OptionComponent,SociodemoComponent,AddDialogComponent,RecomandationComponent, GpaqComponent, DetailsRecoComponent, DeleteDialogComponent, EditDialogComponent, IddleUserComponent, BilanLipidiqueComponent],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
