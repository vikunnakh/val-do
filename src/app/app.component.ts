import { DOCUMENT } from "@angular/common";
import { AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component, Inject } from "@angular/core";
import { Observable } from "rxjs";
import { LoadingService } from "./services/loading.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements AfterContentChecked, AfterViewInit {
	loader$!: Observable<boolean>;

	constructor(
		public loadingService: LoadingService,
		private cdr: ChangeDetectorRef,
		@Inject(DOCUMENT) private _ducument: Document
	) {}

	ngAfterViewInit(): void {
		this.setHeight();
	}

	setHeight(): void {
		const window: Window = this._ducument.defaultView as Window;
		const footer: any = window.document.querySelector(`footer`)?.clientHeight;
		const shell: any = window.document.querySelector(`.shell`);
		shell.style.minHeight = `${window.innerHeight - (shell.offsetTop + footer)}px`;
	}

	ngAfterContentChecked(): void {
		this.cdr.detectChanges();
		this.loader$ = this.loadingService.loading$;
	}
}
