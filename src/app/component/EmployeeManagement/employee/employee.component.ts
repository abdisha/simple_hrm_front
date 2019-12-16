import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Departement } from 'src/app/model/Departement';
import { Education } from 'src/app/model/Education';
import { Employee } from 'src/app/model/Employee';
import { EmployeeLimted } from 'src/app/model/EmployeeLimted';
import { EmployeePersonalInfo } from 'src/app/model/EmployeePersonalInfo';
import { Exprience } from 'src/app/model/Exprience';
import { DepartementService } from 'src/app/service/departement.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { InteractionServiceService } from 'src/app/service/utilit/interaction-service.service';


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
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
 
  displayedColumns:string[] = ['profileImage','employeeId', 'fullName'];
  displayedColumnsEducation = ['instituation','eduactionLevel','_GBA','Action'];
  displayedColumnsExprience = ['jobPosition','companyName','rangeTime','fromDate','toDate','Action'];
  EducationData :MatTableDataSource<Education>;
  ExprienceData :MatTableDataSource<Exprience>;
  EmployeeData:EmployeeLimted[];
  
  loading=false;
  avatar=  "../../../../assets/avatar.svg"
  error;
  status:string=null;
  PersonalForm:FormGroup;
  ExpForm:FormGroup;
  EduForm:FormGroup
  value:string;
  selectedFile:File;
  departements: Departement[] ;
  employees:Employee;
  // dataSource :MatTableDataSource<EmployeeLimted>;
  httpSvc: any;
  imagePath: File;
  imageUrl: string | ArrayBuffer;
 
   
  /**
   *
   */
  constructor(private fb:FormBuilder,
    private empService:EmployeeService,
    private deptService:DepartementService,
    private interServie:InteractionServiceService,private domSanitizer: DomSanitizer) {
    

  } 
 
   




  ngOnInit() {
    this.interServie.employeeLimitedObjct$.subscribe(
      x=>{
        if(x!=null)
            {
                this.selection(x);
            }
      }
    )
  
    this.deptService.getDepartement().subscribe(result=>{
      this.departements = result
    });
    
  //#formGroups 
    this.PersonalForm = this.fb.group({
      id:[""],
      employeeId:["",[Validators.required]],
      fullName:["",[Validators.required,Validators.maxLength(30),Validators.minLength(4)]],
       basicSalary:[""],
       phone:["",[Validators.minLength(9),Validators.maxLength(16)]],
       age:["",[Validators.required,Validators.min(18),Validators.max(80)]],
      email:["",[Validators.email]],
      sex:["",[Validators.required]],
      birthDate:[""],
      address:[""],

    })
   this.ExpForm = this.fb.group({
      id:[""],
      jobPosition:["",[Validators.required,Validators.maxLength(40),Validators.minLength(5)]],
      companyName:["",[Validators.required]],
      rangeTime:["",[Validators.required,Validators.min(1),Validators.max(40)]],
      fromDate:["",[Validators.required]],
      toDate:["",[Validators.required]]

   })
   this.EduForm = this.fb.group({
    id:[""],
    eduactionLevel:["",[Validators.required]],
    courseOfeducation:["",[Validators.required]],
    graduatedYear:["",[Validators.required]],
    _GBA:["",Validators.required],
    instituation:["",Validators.required]
   })
   //#endregion
  }  

  //#Control
    //#personal information
    get  employeeId(){return this.PersonalForm.get('employeeId')};
    get fullName(){return this.PersonalForm.get('fullName')}
    get basicSalary(){return this.PersonalForm.get('basicSalary')}
    get phone(){return this.PersonalForm.get('phone')}
    get   age(){return this.PersonalForm.get('age')}
    get  email(){return this.PersonalForm.get('email')}
    get  sex(){return this.PersonalForm.get('sex')}
    get birthDate(){return this.PersonalForm.get('email')}
    get address(){return this.PersonalForm.get('address')}
    //#endregion
    //#Education information
    get  eduactionLevel(){return this.EduForm.get('eduactionLevel')};
    get courseOfeducation(){return this.EduForm.get('courseOfeducation')}
    get graduatedYear(){return this.EduForm.get('graduatedYear')}
    get _GBA(){return this.EduForm.get('_GBA')}
    get   instituation(){return this.EduForm.get('instituation')}
    //#endregion
    //#Education Exprience
    get  jobPosition(){return this.ExpForm.get('jobPosition')};
    get companyName(){return this.ExpForm.get('companyName')}
    get rangeTime(){return this.ExpForm.get('rangeTime')}
    get fromDate(){return this.ExpForm.get('fromDate')}
    get   toDate(){return this.ExpForm.get('toDate')}
//#endregion
  //#endregion

 async saveAllData(){
    if (this.PersonalForm.invalid) {
      return ;
      
    }
   this.loading = true;
   
    this.employees = new Employee()
    this.employees=this.PersonalForm.value;
    if(this.EducationData!=null)
    this.employees.education= this.EducationData.data
    if(this.ExprienceData!=null)
    this.employees.exprience = this.ExprienceData.data;
    if(this.PersonalForm.value.id==null||this.PersonalForm.value.id==''){
     await this.empService.SaveEmployee(this.employees).subscribe(x=>{this.refresh_Control()})
     }else{
     await this.empService.updateEmployee(this.employees,this.PersonalForm.value.id)
         .subscribe(x=>{this.refresh_Control()}  );
     }
     if(this.selectedFile!=null){
          await  this.empService.uploadAvatar(this.selectedFile,this.employees.employeeId).subscribe(
       event=>{
         if(event.type==HttpEventType.UploadProgress){
           console.log("uploading in progress "+Math.round(event.loaded/event.total*100)+"%")
         }
       }
     );
     this.refresh_Control()  ; 
     }
     
    console.log(this.employees);
    
  }

  addEducation(){
    let edu =  new Education()
    edu = this.EduForm.value;
    console.log("education added:"+edu.eduactionLevel);
    if(this.EducationData.data==null){
        this.EducationData = new MatTableDataSource<Education>()
    }
   
    this.EducationData.data.push(edu);
    this.EducationData._updateChangeSubscription()
    this.EduForm.reset();
  }
    addExprience(){
    let ex =  new Exprience()
    ex = this.ExpForm.value;
    console.log("education added:"+ex.fromDate);
    if(this.ExprienceData.data==null){
        this.ExprienceData = new MatTableDataSource<Exprience>()
        
    }
      this.ExprienceData.data.push(ex);

    
   
    this.ExprienceData._updateChangeSubscription()
    this.ExpForm.reset();
  }
 

 
   refresh_Control(){   
    this.loading=false;
    this.PersonalForm.reset();
     this.EduForm.reset();
     this.ExpForm.reset();
     this.ExprienceData.data=null;
     this.ExprienceData._updateChangeSubscription();
      this.interServie.refreshEmployeeLimitedInfo(true);
     this.EducationData.data=null;
     this.EducationData._updateChangeSubscription();
     this.status=null;
     this.selectedFile = null;
     this.imageUrl = null;
}


   selection(row){
     const emPersonal = new EmployeePersonalInfo();
     this.empService.findEmployeeById(row.employeeId).subscribe(result=>{
      this.employees = result
        if(this.EducationData==null){
        this.EducationData =new MatTableDataSource<Education>(this.employees.education);
       
       }else{
        this.EducationData.data = this.employees.education;
      } 
       this.EducationData._updateChangeSubscription()
       
        if (this.ExprienceData==null) {
           this.ExprienceData =new MatTableDataSource<Exprience>(this.employees.exprience);
          
        }else{
          this.ExprienceData.data = this.employees.exprience;
        }

        this.ExprienceData._updateChangeSubscription();
         if(result!=null){
          emPersonal.id = this.employees.id;
          emPersonal.fullName = this.employees.fullName;
          emPersonal.employeeId = this.employees.employeeId;
          emPersonal.phone = this.employees.phone;
          emPersonal.email = this.employees.email;
          emPersonal.birthDate = this.employees.birthDate;
          emPersonal.sex = this.employees.sex;
          emPersonal.age = this.employees.age;
          emPersonal.address = this.employees.address;
          emPersonal.basicSalary = this.employees.basicSalary;
          this.imageUrl = row.profileImage;
          this.status = this.employees.status;

          this.PersonalForm.setValue(emPersonal)
        }
      
     
     },error=>{this.error=error});


  }
  setEduValue(row){
    this.EduForm.setValue(row);
  }
  setExValue(row){
    this.ExpForm.setValue(row);
  }
  OnFileSelected(event){
    this.selectedFile =<File> event.target.files[0];
    console.log(this.selectedFile);
    var reader = new FileReader();
  this.imagePath = this.selectedFile;
  reader.readAsDataURL(this.selectedFile); 
  reader.onload = (_event) => { 
    this.imageUrl = reader.result; 
  }


  }
  

}
