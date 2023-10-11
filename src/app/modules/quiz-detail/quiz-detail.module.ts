import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizDetailRoutingModule } from './quiz-detail-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogActions, MatDialogModule } from '@angular/material/dialog';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { QuizPageComponent } from 'src/app/pages/quiz-page/quiz-page.component';
import { QuizAnswersDialogComponent } from 'src/app/dialogs/quiz-answers-dialog/quiz-answers-dialog.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    QuizPageComponent,
    QuizAnswersDialogComponent
  ],
  imports: [
    CommonModule,
    QuizDetailRoutingModule,
    SharedModule,
    MatDialogModule,
    MatDividerModule,
    MatRadioModule,
    MatButtonModule
  ]
})
export class QuizDetailModule { }
