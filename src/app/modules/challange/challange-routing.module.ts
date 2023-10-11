import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChallangeDetailComponent } from 'src/app/pages/challange-detail/challange-detail.component';
import { ChallangeComponent } from 'src/app/pages/challange/challange.component';

const routes: Routes = [
  {path: '', component: ChallangeComponent},
  { path: ":id", component: ChallangeDetailComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallangeRoutingModule { }
