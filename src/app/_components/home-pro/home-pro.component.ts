import {Component, OnInit, SimpleChanges} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-pro',
  templateUrl: './home-pro.component.html',
  styleUrls: ['./home-pro.component.css']
})
export class HomeProComponent implements OnInit {
  currentUser = localStorage.getItem("currentUser")

  constructor(private router : Router) {
    console.log(localStorage.getItem("currentRole" ))
    if (localStorage.getItem("currentRole" ) === "role_professional"){
    } else {

      this.router.navigate(["/login"])
    }


  }
  ngOnChanges(changes: SimpleChanges) {

  }

  ngOnInit() {
  }

}
