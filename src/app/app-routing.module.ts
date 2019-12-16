import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ReinstateComponent } from './component/EmployeeManagement/reinstate/reinstate.component';
import { EmployeeComponent } from './component/EmployeeManagement/employee/employee.component';
import { DisciplinaryMeasureComponent } from './component/EmployeeManagement/disciplinary-measure/disciplinary-measure.component';
import { AssignPositionComponent } from './component/EmployeeManagement/assign-position/assign-position.component';
import { SalaryIncrementComponent } from './component/EmployeeManagement/salary-increment/salary-increment.component';
import { ChangeEmployementTypeComponent } from './component/EmployeeManagement/change-employement-type/change-employement-type.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './component/dashboard/dashboard.component';


const routes: Routes = [
   {path:'',redirectTo:"master-template",pathMatch:"full"},
    {path:'login',component:LoginComponent},
    {path:'master-template' ,component:SidebarComponent,canActivate: [AuthGuard],  
  children:
    [{path:'',component:DashboardComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'employee',component:EmployeeComponent},
    {path:'reinstate', component:ReinstateComponent},
    {path:'disciplinary-measure', component:DisciplinaryMeasureComponent},
    {path:'assign-position', component:AssignPositionComponent},
    {path:'change-employement-type', component:ChangeEmployementTypeComponent},
    {path:'salary-increment', component:SalaryIncrementComponent}]},
    {path:"**",component:NotFoundComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const component=[HomeComponent,SidebarComponent,
  EmployeeComponent,
  ReinstateComponent,
  DisciplinaryMeasureComponent,
  AssignPositionComponent,
  DashboardComponent,
  NotFoundComponent,
  LoginComponent,
  ChangeEmployementTypeComponent,
  RegisterComponent,
  SalaryIncrementComponent
  ]
