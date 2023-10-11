import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Observable, tap } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Challenge } from 'src/app/interfaces/challange';
import { CanonicalService } from 'src/app/services/canonical.service';
import { ChallangesService } from 'src/app/services/challanges.service';
import { HighLightService } from 'src/app/services/highlight.service';
import { LoadingService } from 'src/app/services/loading.service';
import { LoginService } from 'src/app/services/login.service';
import { MetaService } from 'src/app/services/meta.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-challange-detail',
  templateUrl: './challange-detail.component.html',
  styleUrls: ['./challange-detail.component.scss'],
  providers: [HighLightService],

})
export class ChallangeDetailComponent implements OnInit, OnDestroy {
	public baseUrl: string = environment.baseUrl;
	public challange$!: Observable<Challenge>;
	public isAdmin$!: Observable<boolean>;

	public jsonLd: any;

	constructor(
		private _challangesService: ChallangesService,
		private _route: ActivatedRoute,
		private _matDialog: MatDialog,
		private _router: Router,
		private _loadingService: LoadingService,
		private _metaService: MetaService,
		public loginService: LoginService,
		private _renderer2: Renderer2,
		private _canonicalService: CanonicalService
	) {}

	ngOnInit(): void {
		this._canonicalService.update(this._renderer2);

		this._loadingService.start();
		this.challange$ = this._challangesService.getChallenge(this._route.snapshot.params["id"]).pipe(
			tap((challange) => {
				/* meta */
				this._metaService.update(challange.title, challange.smallDescr, `${environment.baseUrl}/${challange.img}`);

				/* ld */
				this.jsonLd = {
					"@context": "https://schema.org",
					"@type": "NewsArticle",
					headline: challange.title,
					image: [`${environment.baseUrl}/${challange.img}`],
					author: [
						{
							"@type": "Person",
							name: "Val Do",
							url: "https://twitter.com/va1_do",
						},
					],
				};
			}),
			finalize(() => this._loadingService.end())
		);
	}

	ngOnDestroy(): void {
		this._canonicalService.remove();
	}

	delete() {
		const dialog = this._matDialog.open(ConfirmationDialogComponent, {
			width: `420px`,
			data: {
				descr: `დარწმუნებული ხარ, რომ გსურს გამოწვევის წაშლა?`,
			},
		});

		dialog.afterClosed().subscribe((res) => {
			if (res)
				this._challangesService.deleteCallenge(this._route.snapshot.params["id"]).subscribe(
					() => {
						this._router.navigateByUrl(`/challenges`);
					},
					(err) => {
						console.log(err.error);
					}
				);
		});
	}
}
