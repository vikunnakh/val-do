import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetRoutingModule } from './reset-routing.module';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { ResetComponent } from 'src/app/pages/reset/reset.component';




@NgModule({
  declarations: [
    ResetComponent
  ],
  imports: [
    CommonModule,
    ResetRoutingModule,
    MatInputModule,
		MatButtonModule,
		ReactiveFormsModule,
		MatCardModule,
		MatFormFieldModule,
  ]
})
export class ResetModule { }
