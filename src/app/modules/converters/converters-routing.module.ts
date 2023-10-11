import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConvertersComponent } from 'src/app/pages/converters/converters.component';

const routes: Routes = [
  {path: '', component: ConvertersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConvertersRoutingModule { }
