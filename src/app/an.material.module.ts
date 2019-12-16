import { NgModule} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card'
import { MatRadioModule} from '@angular/material/radio'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete'
import { MatListModule } from '@angular/material/list';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {MatDatepickerModule, MatDatepickerToggle} from '@angular/material/datepicker'

import {MomentDateModule} from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatTableModule} from '@angular/material/table'
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatSortModule} from '@angular/material/sort';
import  {MatExpansionModule} from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatGridListModule, MatTabsModule, MatSelectModule } from '@angular/material';

 

@NgModule({
  exports: [
    AngularFontAwesomeModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatTableModule,
    MatDatepickerModule,
    MomentDateModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatRadioModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,MatNativeDateModule,
    MatTabsModule,
    MatSelectModule
  ],
  imports: [
     CommonModule,
    AngularFontAwesomeModule,
    MatSelectModule,
    MatPaginatorModule,
    MatGridListModule,
    MatSortModule,
    MatExpansionModule,
    MatTableModule,
    MatDatepickerModule,
    MomentDateModule,
    MatNativeDateModule,
    MatProgressBarModule,
      MatAutocompleteModule,
      MatTabsModule
    ,
    MatNativeDateModule,
    MatRadioModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule
    
  ]
})
export class AnMaterialModule { }
