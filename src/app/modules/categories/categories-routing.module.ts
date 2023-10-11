import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LessonsComponent } from 'src/app/pages/lessons/lessons.component';
import { LessonCardComponent } from 'src/app/components/lesson-card/lesson-card.component';
import { CategoriesComponent } from 'src/app/pages/categories/categories.component';

const routes: Routes = [
  {path: "", component: CategoriesComponent},
  {path: ":id", component: LessonsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
