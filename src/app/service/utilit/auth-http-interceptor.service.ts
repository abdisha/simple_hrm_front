import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ok } from 'assert';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptorService implements HttpInterceptor {
 
   ok:string;
  constructor(private authService:AuthService) { } 
  
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getAuthToken();
    let authReq 
    if (authToken!=null) {
          authReq = req.clone({
          headers: req.headers.set("Authorization", sessionStorage.getItem('token'))
     });
    
      }else{
        authReq = req.clone({
        });
      }
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
   

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }

}
 