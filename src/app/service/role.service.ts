import { Injectable } from '@angular/core';
import { Role } from '../model/Role';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {


  url:string="http://192.168.1.16:8989/role/";
  // url:string="http://localhost:8989/role/";
  constructor(private http:HttpClient) {
    
   }

   getAllRole():Observable<Role[]>{
     return this.http.get<Role[]>(`${this.url}getAll`);
   }

   saveRole(data):Observable<any>{
     return this.http.post(this.url,data);
   }
}
