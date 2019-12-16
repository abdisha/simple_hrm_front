import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import {Observable, observable} from 'rxjs';
import { Employee } from '../model/Employee';
import { EmployeeLimted } from '../model/EmployeeLimted';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

 
 
  url:string="http://192.168.1.16:8989/employee/";
  // url:string="http://localhost:8989/employee/";
 employee:Employee;
 header = new HttpHeaders({
   "Authorization": sessionStorage.getItem('token')
})
  constructor(private http:HttpClient) { }

  

  getEmployee():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.url)
    .pipe(
           
      )
    
               
  }

  getEmployeeLimetdInfo():Observable<EmployeeLimted[]>{
    
    return this.http.get<EmployeeLimted[]>(`${this.url}employeeLimitedInfo`, {headers:{ "Authorization": sessionStorage.getItem('token')}});
  }
  
  SaveEmployee(data:Employee):Observable<any>{
   
      return this.http.post(this.url,data,{
        reportProgress:true,
        observe:'body'})
      }
   findEmployeeById(id:string):Observable<Employee>{
     return this.http.get<Employee>(`${this.url}find/${id}`);
   }
   
   deleteEmployeeById(id:String):Observable<any>{
    return this.http.delete(`${this.url}${id}`);
   }
   deleteAllEmployee():Observable<any>{
     return this.http.delete("http://192.168.1.16:8989/employeeAll/");
   }

   updateEmployee(data:Employee,id:string):Observable<any>{
     return this.http.put(`${this.url}update/${id}`,data);
   }
   uploadAvatar(file:File,employeeid:string):Observable<any> {
       const formData:FormData = new FormData()

     formData.append("file", file);
   
 return  this.http.put(`${this.url}upload-image/${employeeid}`,formData,{reportProgress:true,observe:"events"});
 

    
  }
  getImage(employeeId:String):Observable<any>{
    return this.http.get(`${this.url}get-image/${employeeId}`,{responseType:'blob'}).pipe(
       flatMap(blob => {
              return this.blobToBase64(blob);
            })
     )
    
  }
  
 
  private blobToBase64(blob): Observable<any> {
     if(blob==null)
     return;
    const fileReader = new FileReader();
    const observable = new Observable(observer => {
      fileReader.onloadend = () => {
        observer.next(fileReader.result);
        observer.complete();
      };
    });
    fileReader.readAsDataURL(blob);
    return observable;
  }

}
