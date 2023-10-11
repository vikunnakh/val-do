import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { MatCardModule } from "@angular/material/card";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { RegistrationComponent } from 'src/app/pages/registration/registration.component';


@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    MatFormFieldModule,
		ReactiveFormsModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		CommonModule,
		RegistrationRoutingModule,
  ]
})
export class RegistrationModule { }
