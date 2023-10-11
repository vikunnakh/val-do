import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChallangeRoutingModule } from './challange-routing.module';
import { ChallangeComponent } from 'src/app/pages/challange/challange.component';
import { ChallangeCardComponent } from 'src/app/components/challange-card/challange-card.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { ChallangeDetailComponent } from 'src/app/pages/challange-detail/challange-detail.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

console.log("challange loaded")

@NgModule({
  declarations: [
    ChallangeComponent,
    ChallangeCardComponent,
    ChallangeDetailComponent

  ],
  imports: [
    CommonModule,
    ChallangeRoutingModule,
    MatChipsModule,
    MatCardModule,
    MatDialogModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ChallangeModule { }
