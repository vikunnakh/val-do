import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonRoutingModule } from './lesson-routing.module';
import { LessonDetailComponent } from 'src/app/pages/lesson-detail/lesson-detail.component';
import { IsAdminComponent } from 'src/app/components/is-admin/is-admin.component';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaV3Module, RECAPTCHA_LANGUAGE, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';


@NgModule({
  declarations: [
    LessonDetailComponent,
    IsAdminComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    LessonRoutingModule,
    SharedModule,
    RecaptchaV3Module,

  ],
  providers: [
		{
			provide: RECAPTCHA_LANGUAGE,
			useValue: "ka", // use French language
		},
		{
			provide: RECAPTCHA_V3_SITE_KEY,
			useValue: "6Ldr7LUfAAAAAJrPBqgR5qWCzy4f7U20bjcTGlaw",
		},
	],
})
export class LessonModule { }
