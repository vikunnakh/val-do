import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from "@ng-select/ng-select";

import { CvRoutingModule } from './cv-routing.module';
import { ResumeComponent } from 'src/app/pages/resume/resume.component';
import { ResumeDetailComponent } from 'src/app/pages/resume-detail/resume-detail.component';
import { CvDialogComponent } from 'src/app/dialogs/cv-dialog/cv-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    ResumeComponent,
    ResumeDetailComponent,
    CvDialogComponent
  ],
  imports: [
    MatDatepickerModule,
		MatDialogModule,
		MatButtonModule,
		MatFormFieldModule,
		NgSelectModule,
		ReactiveFormsModule,
		MatInputModule,
		MatDividerModule,
		MatChipsModule,
		MatCardModule,
		CommonModule,
		CvRoutingModule,
  ],
  
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CvModule { }
