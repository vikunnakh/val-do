import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SetPasswordRoutingModule } from './set-password-routing.module';
import { SetPasswordComponent } from 'src/app/pages/set-password/set-password.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SetPasswordComponent
  ],
  imports: [
    CommonModule,
    SetPasswordRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ]
})
export class SetPasswordModule { }
