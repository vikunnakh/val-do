import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyRoutingModule } from './verify-routing.module';
import { VerifyEmailComponent } from 'src/app/pages/verify-email/verify-email.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VerifyEmailComponent
  ],
  imports: [
    CommonModule,
    VerifyRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class VerifyModule { }
