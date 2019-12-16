import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppRoutingModule,component } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

 import {  ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MomentDateModule} from '@angular/material-moment-adapter';
import { CommonModule } from '@angular/common';
import { AnMaterialModule } from './an.material.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthHttpInterceptorService } from './service/utilit/auth-http-interceptor.service';

 

@NgModule({
  declarations: [
    AppComponent,
     component,
     DashboardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MomentDateModule,
    FormsModule,
    AppRoutingModule,  
    BrowserAnimationsModule,
    LayoutModule,
    AnMaterialModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
      ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthHttpInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
