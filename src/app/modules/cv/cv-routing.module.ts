import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeDetailComponent } from 'src/app/pages/resume-detail/resume-detail.component';
import { ResumeComponent } from 'src/app/pages/resume/resume.component';

const routes: Routes = [
  {path: '', component: ResumeComponent},
  {path: ':id', component: ResumeDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvRoutingModule { }
