import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from 'src/app/pages/quiz-list/quiz-list.component';

const routes: Routes = [
  {path: '', component: QuizListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizListRoutingModule { }
