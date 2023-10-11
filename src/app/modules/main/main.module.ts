import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from 'src/app/pages/main/main.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BlogCardComponent } from 'src/app/components/blog-card/blog-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    MainComponent,
    BlogCardComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class MainModule { }
