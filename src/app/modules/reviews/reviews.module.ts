import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewsRoutingModule } from './reviews-routing.module';
import { AllReviewsComponent } from 'src/app/pages/all-reviews/all-reviews.component';
import { FullReviewDialogComponent } from 'src/app/dialogs/full-review-dialog/full-review-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';


@NgModule({
  declarations: [
    AllReviewsComponent,
    FullReviewDialogComponent,
  ],
  imports: [
    CommonModule,
    ReviewsRoutingModule,
    SharedModule,
    MatButtonModule,
		MatDialogModule,
		MatCardModule,
    MatDividerModule,
  ],
  schemas: [
   CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class ReviewsModule { }
