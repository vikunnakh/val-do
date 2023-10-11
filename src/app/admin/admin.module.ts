import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatRadioModule } from "@angular/material/radio";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { AdminRoutingModule } from './admin-routing.module';
import { BlogComponent } from './pages/blog/blog.component';
import { AddEditCategoriesComponent } from './dialogs/add-edit-categories/add-edit-categories.component';
import { AddQuestionComponent } from './dialogs/add-question/add-question.component';
import { AddTagDialogComponent } from './dialogs/add-tag-dialog/add-tag-dialog.component';
import { EditTagDialogComponent } from './dialogs/edit-tag-dialog/edit-tag-dialog.component';
import { AddComponent } from './pages/add/add.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { EditComponent } from './pages/edit/edit.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { TagsComponent } from './pages/tags/tags.component';
import { UsersComponent } from './pages/users/users.component';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { CoursesService } from '../services/courses.service';
import { AddEditChallangeComponent} from './pages/add-edit-challange/add-edit-challange.component';


@NgModule({
  declarations: [
    AddComponent,
		EditComponent,
		UsersComponent,
		TagsComponent,
		AddTagDialogComponent,
		EditTagDialogComponent,
		CategoriesComponent,
		AddEditCategoriesComponent,
		QuizComponent,
		AddQuestionComponent,
		BlogComponent,
		ReviewsComponent,
		AddEditChallangeComponent
  ],
  providers: [
    CoursesService,
  ],
  imports: [
    	NgSelectModule,
		CommonModule,
		AdminRoutingModule,
		FormsModule,
		MatCardModule,
		ReactiveFormsModule,
		MatDividerModule,
		MatRadioModule,
		MatInputModule,
		MatCheckboxModule,
		MatDialogModule,
		MatFormFieldModule,
		MatBadgeModule,
		MatButtonModule,
		MatListModule,
		SharedModule,
		MatSelectModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AdminModule { }
