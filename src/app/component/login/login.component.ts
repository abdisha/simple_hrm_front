import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from 'src/app/service/role.service';
import { Role } from 'src/app/model/Role';
import { HttpInterceptor } from '@angular/common/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm:FormGroup;
    list:Role[];
    error:string=null;
    btnValue="login";
    isLogging:boolean=false;
  constructor(private route:Router,
    private roleService:RoleService,
    private fb:FormBuilder,private authService:AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username:["",[Validators.required]],
      password:["",[Validators.required]],
      role:["",[Validators.required]]
    })

    this.roleService.getAllRole().subscribe(x=>{this.list=x; },error=>{error!=null? console.log(error.status):error})
   
  }
  
  async onLoginClicked(){
       if(this.loginForm.invalid)  
          {
            return;
          }
          this.isLogging =true;
          this.btnValue ="Logging.."
       let result;
           result= await this.authService.login(this.loginForm.value.username, this.loginForm.value.password, this.loginForm.value.role);
                         if(result==true )  {
                    this.route.navigate(['/master-template']);
                        }else{
                  this.error =this.authService.baseError;
                  
                }
                  console.log(this.authService.baseError)
                this.isLogging=false;
                  this.btnValue ="Login"

     
  }

  get username(){return this.loginForm.get("username")}
  get password(){return this.loginForm.get("password")}
  get role(){return this.loginForm.get("role")}
}
