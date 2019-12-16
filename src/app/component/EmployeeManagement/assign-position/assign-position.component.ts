import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { InteractionServiceService } from 'src/app/service/utilit/interaction-service.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { EmployeePersonalInfo } from 'src/app/model/EmployeePersonalInfo';
import { Employee } from 'src/app/model/Employee';

@Component({
  selector: 'app-assign-position',
  templateUrl: './assign-position.component.html',
  styleUrls: ['./assign-position.component.scss']
})
export class AssignPositionComponent implements OnInit {
  PersonalForm:FormGroup;
  AssignPositionForm: FormGroup;
  error: any;
  employee:Employee;
  employeeID: string;

  constructor(private fb:FormBuilder,
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
    this.AssignPositionForm = this.fb.group({
      position:["",[Validators.required]],
      departement:["",[Validators.required]],
      reinstateDate:["",[Validators.required]],
      
      typeOfEmployement:["",[Validators.required]],
      basicSalary:[""]
    })
  }
  get position(){return this.AssignPositionForm.get('position')}
    get departement(){return this.AssignPositionForm.get('departement')}
    get basicSalary(){return this.AssignPositionForm.get('basicSalary')}
    get typeOfEmployement(){return this.AssignPositionForm.get('typeOfEmployement')}
    get reinstateDate(){return this.AssignPositionForm.get('reinstateDate')}

getSelectedData(data) {
  this.error = null;
  let employeePersonalInfo:EmployeePersonalInfo = new EmployeePersonalInfo();
  this.employeService.findEmployeeById(data.employeeId).subscribe(result=>{
          if(result!=null){
            this.employee= result; 
          
            employeePersonalInfo.id = this.employee.id;
            employeePersonalInfo.fullName = this.employee.fullName;
            employeePersonalInfo.employeeId = this.employee.employeeId;
            employeePersonalInfo.phone = this.employee.phone;
            employeePersonalInfo.email = this.employee.email;
            employeePersonalInfo.birthDate = this.employee.birthDate;
            employeePersonalInfo.sex = this.employee.sex;
            employeePersonalInfo.age = this.employee.age;
            employeePersonalInfo.address = this.employee.address;
            employeePersonalInfo.basicSalary = this.employee.basicSalary;
            this.PersonalForm.setValue(employeePersonalInfo);
          }
  })
}
}
