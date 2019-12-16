import { Component, OnInit } from '@angular/core';
import { EmployeePersonalInfo } from 'src/app/model/EmployeePersonalInfo';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { InteractionServiceService } from 'src/app/service/utilit/interaction-service.service';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-disciplinary-measure',
  templateUrl: './disciplinary-measure.component.html',
  styleUrls: ['./disciplinary-measure.component.scss']
})
export class DisciplinaryMeasureComponent implements OnInit {
  DiscplinaryForm: FormGroup;
  error: any;
  employee: any;
  PersonalForm: FormGroup;

  constructor(private fb:FormBuilder,
    private interService:InteractionServiceService,
    private employeService:EmployeeService) { }

  ngOnInit() {
    this.interService.employeeLimitedObjct$.subscribe(x=>{
      this.employee = x.employeeId;
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
    this.DiscplinaryForm = this.fb.group({
      position:["",[Validators.required]],
      departement:["",[Validators.required]],
      reinstateDate:["",[Validators.required]],
      
      typeOfEmployement:["",[Validators.required]],
      basicSalary:[""]
    })
  }
  get position(){return this.DiscplinaryForm.get('position')}
    get departement(){return this.DiscplinaryForm.get('departement')}
    get basicSalary(){return this.DiscplinaryForm.get('basicSalary')}
    get typeOfEmployement(){return this.DiscplinaryForm.get('typeOfEmployement')}
    get reinstateDate(){return this.DiscplinaryForm.get('reinstateDate')}

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
