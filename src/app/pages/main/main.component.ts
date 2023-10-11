import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AddReviewDialogComponent } from 'src/app/dialogs/add-review-dialog/add-review-dialog.component';
import { Main } from 'src/app/interfaces/main';
import { CanonicalService } from 'src/app/services/canonical.service';
import { LoginService } from 'src/app/services/login.service';
import { MainService } from 'src/app/services/main.service';
import { MetaService } from 'src/app/services/meta.service';
import { environment } from 'src/environments/environment';

/* step enum */
enum PaginationEnum {
	Next = "next",
	Prev = "prev",
}

/* options interface */
interface PaginationConfig {
	next: string;
	prev: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [MainService]
})
export class MainComponent implements OnInit {

  /* pagination config */
	options: PaginationConfig = {
		next: PaginationEnum.Next,
		prev: PaginationEnum.Prev,
	};

	data$!: Observable<Main>;

	public jsonLd: any;
  constructor(
    private _metaService: MetaService,
    private _matDialog: MatDialog,
    private _loginService: LoginService,
    private _router: Router,
    private _renderer2: Renderer2,
		private _canonicalService: CanonicalService,
		private _mainService: MainService

  ) {}

  ngOnInit(): void {
		this.data$ = this._mainService.get().pipe(
			// * json ld-ის მასივის გენერაცია
			tap((data) => {
				let list: any[] = [];
				data.categories.forEach((cat, i) => {
					list.push({
						"@type": "ListItem",
						position: `${i + 1}`,
						item: {
							"@type": "Course",
							url: `${environment.baseUrl}/categories/${cat._id}`,
							name: `${cat.title}`,
							description: `${cat.descr}`,
							provider: {
								"@type": "Organization",
								name: "Val Do",
								sameAs: `${environment.baseUrl}`,
							},
						},
					});
				});
				this._initJsonLd(list);
			})
		);

		this._canonicalService.update(this._renderer2);
		this._initMeta();
	}

	ngOnDestroy(): void {
		this._canonicalService.remove();
	}

	/**
	 * * json ld-ის ინიციალიზაცია
	 * @param coursesData - გადმოეცემა json ld-ის მასივი
	 */
	private _initJsonLd(coursesData: any[]) {
		this.jsonLd = {
			"@context": "https://schema.org",
			"@type": "ItemList",
			itemListElement: coursesData,
		};
	}

	/**
	 * * meta ინფორმაციის შევსება
	 */
	private _initMeta() {
		this._metaService.update(
			`პროგრამირების უფასო კურსები | val-do.com`,
			`პროგრამირების უფასო კურსები | საიტზე შეძლებ შეისწავლო პროგრამირება სრულიად უფასოდ, JavaScript, HTML, CSS, Angular, ReactJS ენები და FrameWork-ები`
		);
	}

	/**
	 * * შეფასების დაწერის მეთოდი
	 */
	public addReview(): void {
		if (this._loginService.isLogged()) {
			this._matDialog.open(AddReviewDialogComponent, {
				disableClose: true,
				width: `440px`,
			});
			return;
		}
		this._router.navigateByUrl("/auth");
	}
}