import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatMenuModule } from "@angular/material/menu";
import { RouterModule } from "@angular/router";
import { LessonCardComponent } from "../components/lesson-card/lesson-card.component";
import { StarsComponent } from "../components/stars/stars.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ConfirmationDialogComponent } from "../dialogs/confirmation-dialog/confirmation-dialog.component";
import { AddReviewDialogComponent } from "../dialogs/add-review-dialog/add-review-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { ReviewCardComponent } from "../components/review-card/review-card.component";
import { CategoryCardComponent } from "../components/category-card/category-card.component";
import { SearchBarComponent } from "../components/search-bar/search-bar.component";
import { SafePipe } from "../pipes/safe.pipe";



@NgModule({
  declarations: [
		SafePipe,
		StarsComponent,
		SearchBarComponent,
		CategoryCardComponent,
		ReviewCardComponent,
		LessonCardComponent,
		ConfirmationDialogComponent,
		AddReviewDialogComponent,
  ],
  imports: [
		MatInputModule,
		ReactiveFormsModule,
		CommonModule,
		MatProgressBarModule,
		MatSelectModule,
		MatButtonModule,
		MatMenuModule,
		MatDividerModule,
		MatDialogModule,
		MatCardModule,
		RouterModule,
		MatFormFieldModule,
		MatAutocompleteModule,
  
  ],
  exports: [
	AddReviewDialogComponent,
	ConfirmationDialogComponent,
	LessonCardComponent,
	ReviewCardComponent,
	CategoryCardComponent,
	SearchBarComponent,
	StarsComponent,
	SafePipe,
  ],
  schemas: [
	CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class  SharedModule { }
