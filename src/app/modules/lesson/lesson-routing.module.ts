import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LessonDetailComponent } from 'src/app/pages/lesson-detail/lesson-detail.component';

const routes: Routes = [
  {path: ':id', component: LessonDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonRoutingModule { }
