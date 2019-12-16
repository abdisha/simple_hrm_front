import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { EmployeeLimted } from '../model/EmployeeLimted';
import { EmployeeService } from '../service/employee.service';
import { InteractionServiceService } from '../service/utilit/interaction-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  employee=new FormControl();
  EmployeeData: EmployeeLimted[];
  includeEmployee=false;
  username ;
  filteredOptions: Observable<EmployeeLimted[]>;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


       constructor(private breakpointObserver: BreakpointObserver,private domSanitizer:DomSanitizer,
        private empService:EmployeeService,
         private intarSevice:InteractionServiceService, private route:ActivatedRoute,private router:Router) {}

       ngOnInit(){
         this.username = sessionStorage.getItem('username');
         this.route.paramMap.subscribe();
         this.loadEmployeeLimitedInfo();
         this.intarSevice.nowRefreshEmployeeLimited$.subscribe(x=>{
            if (x) {
              this.loadEmployeeLimitedInfo();
            }
         })
         this.filteredOptions = this.employee.valueChanges
            .pipe(
              startWith(''),
              map(value => typeof value === 'string' ? value : value.fullName),
              map(fullName => fullName ? this._filter(fullName) : this.EmployeeData)
            );
       }

       displayFn(employe?: EmployeeLimted): string | undefined {
          
        return employe ? employe.fullName : undefined;
      }
      
      


      sendData(data:EmployeeLimted){
        this.intarSevice.sendEmployeeLimitedObject(data)

      }

      ///
      getSelectedEmployee(Data){
        if(Data!=null)
        this.sendData(Data)
      }


       private _filter(value: string): EmployeeLimted[] {
        const filterValue = value.toLowerCase();
    
        return this.EmployeeData.filter(option => option.fullName.toLowerCase().indexOf(filterValue)===0);
      }

      // load sample employee information  from getway
       async loadEmployeeLimitedInfo(){

        this.empService.getEmployeeLimetdInfo().subscribe(re => {
         this.EmployeeData = re;
          this.EmployeeData.forEach(x=>{
            if(x.profileImage!=null){    
               this.empService.getImage(x.employeeId).subscribe(re=>{
              
                x.profileImage = re; 
                      
           
            })
            }
            
           })
             
        });
        
        this.employee.setValue('');
      }

    /**
     * getAssignPosition
     */
    public getEmployee() {
      this.includeEmployee=true;
      this.employee.setValue('')
       this.router.navigate(['employee'],{relativeTo:this.route})
    }
        /**
     * getAssignPosition
     */
    public getAssignPosition() {
      this.employee.setValue('')
      this.includeEmployee=true;
      this.router.navigate(['assign-position'],{relativeTo:this.route})
   }     /**
   * getAssignPosition
   */
  public getDashBoard() {
    this.employee.setValue('')
    this.includeEmployee=false;

    this.router.navigate(['dashboard'],{relativeTo:this.route})
 }
       /**
     * getAssignPosition
     */
    public getReinState() {
      this.employee.setValue('')

      this.router.navigate(['reinstate'],{relativeTo:this.route})
   }
       /**
     * getAssignPosition
     */
    public getDisciplinaryMeasure() {
      this.employee.setValue('')
      this.includeEmployee=true;

      this.router.navigate(['disciplinary-measure'],{relativeTo:this.route})
   }
         /**
     * getAssignPosition
     */
    public getChangeEmployementType() {
      this.employee.setValue('')
      this.includeEmployee=true;

      this.router.navigate(['change-employement-type'],{relativeTo:this.route})
   }
   
         /**
     * getAssignPosition
     */
    public getSalaryIncrement() {
      this.employee.setValue('')
      this.includeEmployee=true;

      this.router.navigate(['salary-increment'],{relativeTo:this.route})
   }
}
