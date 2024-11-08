import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizPageComponent } from 'src/app/pages/quiz-page/quiz-page.component';

const routes: Routes = [
  {path: ':id', component: QuizPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizDetailRoutingModule { }
