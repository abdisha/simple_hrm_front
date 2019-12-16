import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departement } from '../model/Departement';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
 url:string ="http://192.168.1.16:8989/departement/";
  constructor(private http:HttpClient) {

   }
   getDepartement():Observable<Departement[]>{
      return this.http.get<Departement[]>(this.url)
   }
}
