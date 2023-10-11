import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConvertersRoutingModule } from './converters-routing.module';
import { ConvertersComponent } from 'src/app/pages/converters/converters.component';


@NgModule({
  declarations: [
    ConvertersComponent
  ],
  imports: [
    CommonModule,
    ConvertersRoutingModule
  ]
})
export class ConvertersModule { }
