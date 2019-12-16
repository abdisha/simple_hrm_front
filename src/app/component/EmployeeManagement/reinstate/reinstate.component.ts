import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InteractionServiceService } from 'src/app/service/utilit/interaction-service.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { EmployeeLimted } from 'src/app/model/EmployeeLimted';
import { Employee } from 'src/app/model/Employee';
import { DomSanitizer } from '@angular/platform-browser';
import { EmployeePersonalInfo } from 'src/app/model/EmployeePersonalInfo';


export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-reinstate',
  templateUrl: './reinstate.component.html',
  styleUrls: ['./reinstate.component.scss']
})
export class ReinstateComponent implements OnInit {
  PersonalForm:FormGroup;
  ReinstateForm:FormGroup;
  employeeID:string;
  error:string;
  employee:Employee;
  imageUrl: string;
  status:string = null;
  constructor(private fb:FormBuilder,private domSanitizer:DomSanitizer,
    private interService:InteractionServiceService,
    private employeService:EmployeeService) { }

  ngOnInit() {
    this.interService.employeeLimitedObjct$.subscribe(x=>{
      this.employeeID = x.employeeId;
      this.getSelectedData(x)
    });
    this.PersonalForm = this.fb.group({
      id:[""],
      employeeId:[""],
      fullName:[""],
       basicSalary:[""],
       phone:[""],
       age:[""],
      email:[""],
      sex:[""],
      birthDate:[""],
      address:[""]
    });
    this.ReinstateForm = this.fb.group({
      position:["",[Validators.required]],
      departement:["",[Validators.required]],
      reinstateDate:["",[Validators.required]],
      
      typeOfEmployement:["",[Validators.required]],
      basicSalary:[""]
    })
  }
  getSelectedData(data) {
    this.error = null;
    let employeePersonalInfo:EmployeePersonalInfo = new EmployeePersonalInfo();
    this.employeService.findEmployeeById(data.employeeId).subscribe(result=>{
            if(result!=null){
              this.employee= result; 
             this.employeeID  = this.employee.employeeId;
              employeePersonalInfo.id = this.employee.id;
              employeePersonalInfo.fullName = this.employee.fullName;
              employeePersonalInfo.employeeId = this.employee.employeeId;
              employeePersonalInfo.phone = this.employee.phone;
              employeePersonalInfo.email = this.employee.email;
              employeePersonalInfo.birthDate = this.employee.birthDate;
              employeePersonalInfo.sex = this.employee.sex;
              employeePersonalInfo.age = this.employee.age;
              this.imageUrl = data.profileImage;
              employeePersonalInfo.address = this.employee.address;
              employeePersonalInfo.basicSalary = this.employee.basicSalary;
              this.status = this.employee.status;
              this.PersonalForm.setValue(employeePersonalInfo);
              //set ReinstateForm values
            this.ReinstateForm.value.position  =this.employee.position ;
         this.ReinstateForm.value.departement = this.employee.departement ;
     this.ReinstateForm.value.basicSalary   =   this.employee.basicSalary ;
           this.ReinstateForm.value.typOfEmployement =this.employee.typOfEmployement;
            }
    },err=>{this.error = err})
  }

    get position(){return this.ReinstateForm.get('position')}
    get departement(){return this.ReinstateForm.get('departement')}
    get basicSalary(){return this.ReinstateForm.get('basicSalary')}
    get typeOfEmployement(){return this.ReinstateForm.get('typeOfEmployement')}
    get reinstateDate(){return this.ReinstateForm.get('reinstateDate')}
    saveReinstate(){ 
   
      if(this.ReinstateForm.invalid || this.PersonalForm.value.employeeId==null )
      return
     
       this.employeService.findEmployeeById(this.PersonalForm.value.employeeId).subscribe(x=>{
         this.employee =x;
        
         if(x!=null){  
            this.employee.status = "Active"; 
           this.employee.position = this.ReinstateForm.value.position;
           this.employee.departement = this.ReinstateForm.value.departement;
           this.employee.basicSalary = this.ReinstateForm.value.basicSalary;
           this.employee.typOfEmployement =this.ReinstateForm.value.typOfEmployement;
            this.employeService.SaveEmployee(this.employee).subscribe(null,errorResult=>{this.error=errorResult})
            this.PersonalForm.reset();
            this.ReinstateForm.reset();
            this.status=null;
             
            this.interService.refreshEmployeeLimitedInfo(true)
         }else{
          
           this.error="Sorry! we couldn't find full employee information !"
         }
       })
    }
    
}
