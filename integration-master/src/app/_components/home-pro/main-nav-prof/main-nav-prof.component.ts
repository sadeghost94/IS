import {Component, EventEmitter, Input, Output} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {environment} from "../../../../environments/environment";




import { map, shareReplay } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "../../../_services";
declare var  appitems ;
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-main-nav-prof',
  templateUrl: './main-nav-prof.component.html',
  styleUrls: ['./main-nav-prof.component.css']
})
export class MainNavProfComponent {
 currentUser = localStorage.getItem("currentUser");
 obj : any;
 LOG_OUT_URL : string;



appitems  = [
    {
      label: 'E-pod Sante',
      icon: '',
      imageIcon: 'https://www.jobillico.com/medias/logo-entreprise/0/0/exp_logo_7966_fr_2016_09_02_14_49_44.png',
      link: '',
      externalRedirect: true
    },
    {
      label: 'Gestion',
      icon: 'supervised_user_circle',
      items: [
        {
          label: 'Patient',
          link: '/listpatient',
          icon: 'supervisor_account',

        }

      ]
    }

  ];
  config = {
    paddingAtStart: false,
    interfaceWithRoute: true,
    classname: 'my-custom-class',
    listBackgroundColor: `white`,
    fontColor: `#323232`,
    backgroundColor: `white`,
    selectedListFontColor: `red`,
    //highlightOnSelect: true,
    collapseOnSelect: true,
    rtlLayout: false
  };
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    selectedItem($event) {
      console.log(this.currentUser)


    }

    selectedLabel($event) {
    }



  constructor(private breakpointObserver: BreakpointObserver,
              private  authenticationService : AuthenticationService,
              private router :  Router, private http: HttpClient,
              public zone: NgZone) {

          if (localStorage.getItem("currentRole" ) === "role_professional")
          {  this.obj = JSON.parse(this.currentUser)
            this.LOG_OUT_URL = environment.LOG_OUT_URL;

          }else {
            this.router.navigate(["/"])
          }


  }
  toggleMenu() {
    this.zone.run(()=>{

    })
  }
  logOut() {
    this.authenticationService.logout()



  }

}






