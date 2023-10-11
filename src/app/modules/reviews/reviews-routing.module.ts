import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllReviewsComponent } from 'src/app/pages/all-reviews/all-reviews.component';

const routes: Routes = [
  {path: "", component: AllReviewsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class ReviewsRoutingModule { }
