import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, delay, delayWhen, map, catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Users } from 'src/app/model/Users';
import { Role } from 'src/app/model/Role';

interface JwtResponse{
  username:string;
  token:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url:string="http://192.168.1.16:8989/api/auth/login";
  // url:string="http://localhost:8989/api/auth/login";

  constructor(private http :HttpClient) { }
  isLoggedIn =false;
  token:string;
  baseError:string=null;
  username:string;
  errorFound:boolean=false;
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  // login(): Observable<boolean> {
  //   return of(true).pipe(
  //     delay(1000),
  //     tap(val => this.isLoggedIn = true)
  //   );
  // }

    async login(username:string, password:string, roleName:string) {
    let user = new Users();
    let ERROR=null;
    // role.roleName = roleName
    user.userName = username;
    user.password = password;
   await this.authenticateUser(user).subscribe(
              userData=>{
                this.username =userData.username;
                this.token= "Bearer "+ userData.token;
                sessionStorage.setItem('token',this.token)
                sessionStorage.setItem('username',this.username)

                
            },errorResponse=>{
              ERROR = errorResponse;
                  
                  
                }
   )
   console.log(ERROR)

   if (ERROR.status==200) {
    this.baseError =null;
  }else if(ERROR.status=='401'){
    this.baseError = "Incorrect username or password!";
  }else if(ERROR.status ==404){
    this.baseError = "Could not connect to server."
    }

              console.log("this base error: "+this.baseError)
             if(!this.errorFound){
              this.isLoggedIn = true;
              return of(true);
              }else{
              this.isLoggedIn = false;
              return of(false)
              }
  
   
  }

  
  logout(): void {
    this.isLoggedIn = false;
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
  }

 private authenticateUser(user:Users):Observable<JwtResponse>{

     
      return this.http.post<JwtResponse>(this.url,user)
         

 }


    public getAuthToken():string{
        return this.token;
    }

}
