import { LeaveTaken } from './LeaveTaken';
import { Departement } from './Departement';
import { Education } from './Education';
import { Exprience } from './Exprience';
import { Binary } from '@angular/compiler';

export class Employee {
      id:string;
      employeeId:string;
      fullName:string;
      profileImage:string;
      sex:string;
      age:number;
      phone:string;
      email:string;
      address:string;
      status:string;
      birthDate:string;
      position:string;
      departement:Departement;
      basicSalary:number;
      education:Education[];
      exprience:Exprience[];
      LeaveTaken:LeaveTaken[];
      typOfEmployement: string;
}
