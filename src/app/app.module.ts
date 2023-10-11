import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule, BrowserTransferStateModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { InterceptorService } from "./config/interceptor.service";
import { BrowserStateInterceptorService } from "./config/browser-state-interceptor.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { registerLocaleData } from "@angular/common";
import localeKa from "@angular/common/locales/ka";
import { CanonicalService } from "./services/canonical.service";
import { ReactiveFormsModule } from "@angular/forms";
import { LoadingComponent } from "./components/loading/loading.component";
import { UserDropdownComponent } from "./components/user-dropdown/user-dropdown.component";
import { MatMenuModule } from "@angular/material/menu";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { LoginService } from "./services/login.service";
import { FooterComponent } from "./components/footer/footer.component";
import { NgSelectModule } from "@ng-select/ng-select";

registerLocaleData(localeKa);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserDropdownComponent,
    LoadingComponent,
    FooterComponent,
  ],
  imports: [
    MatButtonModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatMenuModule,
		MatDividerModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		HttpClientModule,
		BrowserModule.withServerTransition({ appId: "serverApp" }),
		AppRoutingModule,
		BrowserTransferStateModule,
		NgSelectModule
  ],
  providers: [
		LoginService,
		CanonicalService,
		{ provide: LOCALE_ID, useValue: "ka" },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: BrowserStateInterceptorService,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: InterceptorService,
			multi: true,
		},
	],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
