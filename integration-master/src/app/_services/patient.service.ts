import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserInviteDto} from "../dto/UserInviteDto";

import {UserRequestDto} from "../dto";
import {Request} from "../dto/Request";
import {error} from "util";
import {LoginClientDTO} from "../dto/LoginClientDTO";
import {map} from "rxjs/operators";
import {PatientDto} from "../dto/patient/PatientDto";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  ADD_PATIENT_URL : string
  LIST_PATIENT_URL : string
  ADD_SOCIO :string;
  ADD_ANTE : string;
  GET_SOCIO : string;
  ADD_EXAM : string;
  GET_PATIENT_BY_ID : string;
  VERIF_TOKEN_PATIENT : string;
  LOGIN_PATIENT : string;
  LIST_DEVICE_AVAILABLE : string;
  AFFECT_DEVICE : string;
  RECUP_DEVICE: string;


  constructor(private http : HttpClient) {
    this.ADD_PATIENT_URL = environment.ADD_PATIENT_URL;
    this.LIST_PATIENT_URL = environment.LIST_PATIENT_URL;
    this.ADD_SOCIO = environment.ADD_SOCIO;
    this.ADD_ANTE = environment.ADD_ANTE;
    this.GET_SOCIO = environment.GET_SOCIO;
    this.ADD_EXAM = environment.ADD_EXAM;
    this.GET_PATIENT_BY_ID = environment.GET_PATIENT_BY_ID
    this.VERIF_TOKEN_PATIENT = environment.VERIF_TOKEN_PATIENT
    this.LOGIN_PATIENT = environment.LOGIN_PATIENT;
    this. LIST_DEVICE_AVAILABLE = environment.LIST_DEVICE_AVAILABLE
    this.AFFECT_DEVICE = environment.AFFECT_DEVICE
    this.RECUP_DEVICE = environment.RECUP_DEVICE
  }





  getAll(){
    let token = localStorage.getItem("currentToken");
    const obj = JSON.parse(token);
    let header = new HttpHeaders({'Authorization': "bearer "+obj.access_token});
    return this.http.get(this.LIST_PATIENT_URL, {headers: header})

  }

  getById(id: number) {
    //return this.http.get('/users/' + id);
  }

  getCa() {
    //return  [ { id: '../../data/ca.json'}];
  }

  addPatient(request: Request) {
    let token = localStorage.getItem("currentToken");
    const obj = JSON.parse(token);
    let header = new HttpHeaders({'Authorization': "bearer "+obj.access_token,'Content-Type': 'application/json'} );
    console.log(obj.access_token)
    return this.http.post(this.ADD_PATIENT_URL, request, {headers: header});



  }
  addSocio(request: Request, patientId  : string) {
    let token = localStorage.getItem("currentToken");
    const obj = JSON.parse(token);
    let params = new HttpParams()
      .set('patientId', patientId )
    let header = new HttpHeaders({'Authorization': "bearer "+obj.access_token,'Content-Type': 'application/json'} );
    return this.http.post(this.ADD_SOCIO, request, {headers: header, params: params});



  }
  getSocio(id : string) {
    let token = localStorage.getItem("currentToken");
    const obj = JSON.parse(token);
    let params = new HttpParams()
      .set('patientId', id )
    let header = new HttpHeaders({'Authorization': "bearer "+obj.access_token,'Content-Type': 'application/json'} );
    return this.http.get(this.GET_SOCIO,  {headers: header, params: params})


  }
  getPatient(id: string){
    let token = localStorage.getItem("currentToken");
    console.log(id)
    const obj = JSON.parse(token);
    let params = new HttpParams()
      .set('patientId', id )

    let header = new HttpHeaders({'Authorization': "bearer "+obj.access_token,'Content-Type': 'application/json'} );
    return this.http.get(this.GET_PATIENT_BY_ID,{ headers: header, params: params})

  }
  addAntecedants(request: Request, patientId  : string) {
    let token = localStorage.getItem("currentToken");
    const obj = JSON.parse(token);
    let params = new HttpParams()
      .set('patientId', patientId )
    let header = new HttpHeaders({'Authorization': "bearer "+obj.access_token,'Content-Type': 'application/json'} );
    return this.http.post(this.ADD_ANTE, request, {headers: header, params: params});


  }
  addExam(request: Request, patientId  : string) {
    let token = localStorage.getItem("currentToken");
    const obj = JSON.parse(token);
    let params = new HttpParams()
      .set('patientId', patientId )
    let header = new HttpHeaders({'Authorization': "bearer "+obj.access_token,'Content-Type': 'application/json'} );
    return this.http.post(this.ADD_EXAM, request, {headers: header, params: params});



  }

  recup_token(token : string){
    return this.http.get(this.VERIF_TOKEN_PATIENT + token);  }

  inviter(userInviteDto: UserInviteDto) {


  }
  login(request: Request) {

    let header = new HttpHeaders({'Content-type': 'application/json; charset=utf-8'});

    let rep ;
    return this.http.post(this.LOGIN_PATIENT, request, {
      headers: header})

      .pipe(map(token => {
          // login successful if there's a jwt token in the response
        console.log(token)
        rep = token

          if (token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log(token)
            return token;

          }
          return token;

        })
      );


  }
  //podometres
  getPodosavailable(id: string) {
    let token = localStorage.getItem("currentToken");
    let params = new HttpParams().set('patientId',id)
    const obj = JSON.parse(token);
    let header = new HttpHeaders({'Authorization': "bearer " + obj.access_token});
    return this.http.get(this.LIST_DEVICE_AVAILABLE, {headers: header, params: params})

  }
  recup_podo(request : Request){
    let token = localStorage.getItem("currentToken");
    const obj = JSON.parse(token);
    let header = new HttpHeaders({'Authorization': "bearer " + obj.access_token});
    return this.http.post(this.RECUP_DEVICE, request, {
      headers: header})

      .pipe(map(token => {
          // login successful if there's a jwt token in the response
          console.log(token)

          if (token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log(token)
            return token;

          }
          return token;

        })
      );


  }
  affectPodo(request : Request){
    let token = localStorage.getItem("currentToken");
    const obj = JSON.parse(token);
    let header = new HttpHeaders({'Authorization': "bearer "+obj.access_token,'Content-Type': 'application/json'} );
    console.log(obj.access_token)
    return this.http.post(this.AFFECT_DEVICE, request, {headers: header});




  }




  /*delete(id: number) {
      return this.http.delete(`/users/` + id);
  }*/
}

