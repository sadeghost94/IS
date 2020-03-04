import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';
import {Token, User} from '../_models';
import {LoginClientDTO} from "../dto/LoginClientDTO";
import {PasswordUpdateDto} from "../dto";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  LOGIN_URL: string
  FORGET_PASSWORD_URL: string;
  CONFIRMATION_EMAIL_URL: string;
  PASSWORD_UPDATE_TOKEN_URL: string;
  PASSWORD_UPDATE_URL: string;
  LOG_OUT_URL: string;

  constructor(private http: HttpClient,private router : Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.LOGIN_URL = environment.LOGIN_URL;
    this.FORGET_PASSWORD_URL = environment.FORGET_PASSWORD_URL;
    this.CONFIRMATION_EMAIL_URL = environment.CONFIRMATION_EMAIL_URL;
    this.PASSWORD_UPDATE_TOKEN_URL = environment.PASSWORD_UPDATE_TOKEN_URL;
    this.PASSWORD_UPDATE_URL = environment.PASSWORD_UPDATE_URL;
    this.LOG_OUT_URL = environment.LOG_OUT_URL;


  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return false;
  }

  login(loginClientDto: LoginClientDTO) {
    let params = new HttpParams()
      .set('username', loginClientDto.username)
      .set('password', loginClientDto.password)
      .set('grant_type', 'password');
    let header = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});


    return this.http.post(this.LOGIN_URL, null, {
      headers: header,
      params: params
    })
      .pipe(map(token => {
          // login successful if there's a jwt token in the response


          if (token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            console.log(token)
            localStorage.setItem('currentToken', JSON.stringify(token));
            let code = localStorage.getItem('currentToken')
            let decoded = jwtDecode(code)
            let role = decoded["role"]
            console.log(role)
/*            let found = role.indexOf("ROLE_ADMIN");
            if(found >= 0){
              console.log(found)
            }else {
              found = role.indexOf("ROLE_PROFESSIONAL");
              if(found  >= 0){
                console.log(found)
                } else
                {
                  found = role.indexOf("ROLE_SEARCHER");
                  if(found  >= 0){
                    console.log(found)
                  } else
                  {

                  }
                }

            }*/
            console.log(role.toLowerCase( ))
            localStorage.setItem("currentRole",role.toLowerCase( ))
            localStorage.setItem('currentUser', JSON.stringify(decoded));
            console.log(localStorage.getItem("currentRole"))

          }

          return LoginClientDTO;
        })
      );


  }
// fonction pour mot de passe oublie
  forgetPassword(email: string) {
    let passDto = new PasswordUpdateDto();
    passDto.email = email
    return this.http.post(this.FORGET_PASSWORD_URL, passDto);
  }

// verifie le token et active le compte si le token est valide
  confirmationEmail(token: string): Observable<Object> {
    let header = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});

    return this.http.get(this.CONFIRMATION_EMAIL_URL + token,
      {responseType: 'text'});


  }
  // verifier la validite token du lien envoyer par mail pour changer le mot de passe
    passwordUpdateToken(token: string): Observable<Object> {
      let header = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});

    return this.http.get(this.PASSWORD_UPDATE_TOKEN_URL + token,
      {responseType: 'text'});


  }
  //changement du mot de passe
  passwordUpdate(token: string, password: string): Observable<Object> {
    let params = new HttpParams()
      .set('token', token)
      .set('password', password)
    let header = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});


    return this.http.post(this.PASSWORD_UPDATE_URL, null, {
      headers: header,
      params: params
    })


  }

  logout() {
    // remove user from local storage to log user out
    let token = localStorage.getItem("currentToken");
    const obj = JSON.parse(token);
    let header = new HttpHeaders({'Authorization': "bearer "+obj.access_token});
    this.http.delete(this.LOG_OUT_URL, {headers: header})
      .subscribe(response => {

          console.log(response)

          localStorage.removeItem("currentUser")
          localStorage.removeItem("currentToken")
          localStorage.removeItem("currentRole")
          this.router.navigate(["/login"])


        },
        error =>
        {

        }
      );

  }
}
