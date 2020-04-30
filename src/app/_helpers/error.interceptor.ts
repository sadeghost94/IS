import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import {BehaviorSubject, empty, Observable, throwError} from 'rxjs';
import {catchError, concatMap, delay, filter, retry, retryWhen, switchMap, take, tap} from 'rxjs/operators';

import { AuthenticationService } from '../_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  cachedRequests: Array<HttpRequest<any>> = [];
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  timeLeft: number = 60;
  interval;
  tokenrefreshed = false
  request: HttpRequest<any>
  constructor(private authenticationService: AuthenticationService) {

  }
  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    console.log(req)
    return req.clone({headers: req.headers.set('Authorization', 'bearer ' + token)})



  }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     console.log(request.url)
      let requestDate = new Date().getTime()
      console.log(requestDate)
      let diffDate =  requestDate -  window.localStorage.time
      return next.handle(request).pipe(catchError(err => {
        if (err.status === 401) {
          this.collectFailedRequest( request );
          this.tokenSubject.next(null);
          this.authenticationService.refresh_token().subscribe(result =>{
            console.log("ok")
            console.log(this.cachedRequests)
            let token = localStorage.getItem("currentToken");
            const obj = JSON.parse(token);
            this.tokenSubject.next(obj.access_token);
            let req = request.clone({headers: request.headers.set('Authorization', 'bearer ' + token)})
            return next.handle(req).pipe(tap(result => {
              console.log("result")
              }),
              retry(2),
              catchError((error: HttpErrorResponse) => {
                if (error.status !== 401) {
                  // 401 handled in auth.interceptor
                  console.log("ok")
                }
                return throwError(error);
              })
            )


          }, error1 => {

            console.log("non")
          })
        } else  if (err.status === 500 && request.url.startsWith("https://epod-zuul.herokuapp.com/api/v1/auth-service/oauth/token")) {
          localStorage.clear()
          this.authenticationService.logout()

        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      }))
    }
  public collectFailedRequest ( request ): void {
    this.cachedRequests.push( request );
  }
  public retryFailedRequests (): void {
    // retry the requests. this method can
    // be called after the token is refreshed
    let token = localStorage.getItem("currentToken");
    const obj = JSON.parse(token);
    console.log("iii")

    this.cachedRequests.forEach( request => {
      console.log("ooo")
      return request.clone({ setHeaders: { Authorization:"bearer "+obj.access_token}})

    } );

  }
}
