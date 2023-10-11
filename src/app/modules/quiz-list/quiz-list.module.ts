import { NgModule,CUSTOM_ELEMENTS_SCHEMA, SchemaMetadata } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizListRoutingModule } from './quiz-list-routing.module';
import { QuizListComponent } from 'src/app/pages/quiz-list/quiz-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipListbox, MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [
    QuizListComponent
  ],
  imports: [
    CommonModule,
    QuizListRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatChipsModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class QuizListModule {}
