import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from 'src/app/pages/categories/categories.component';
import { LessonsComponent } from 'src/app/pages/lessons/lessons.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HighLightService } from 'src/app/services/highlight.service';


@NgModule({
  declarations: [
    CategoriesComponent,
    LessonsComponent
    
  ],
  imports: [
    MatMenuModule,
    CommonModule,
    SharedModule,
    MatButtonModule,
    CategoriesRoutingModule
  ],
  providers: [
    HighLightService
  ]
 
})
export class CategoriesModule { }
