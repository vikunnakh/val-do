import { Component, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { ConfirmationDialogComponent } from "src/app/dialogs/confirmation-dialog/confirmation-dialog.component";
import { QuizAnswersDialogComponent } from "src/app/dialogs/quiz-answers-dialog/quiz-answers-dialog.component";
import { User } from "src/app/interfaces/user";
import { CanonicalService } from "src/app/services/canonical.service";
import { HighLightService } from "src/app/services/highlight.service";
import { MetaService } from "src/app/services/meta.service";
import { QuizService } from "src/app/services/quiz.service";
import { environment } from "src/environments/environment";

@Component({
	selector: "app-quiz-page",
	templateUrl: "./quiz-page.component.html",
	styleUrls: ["./quiz-page.component.scss"],
	providers: [HighLightService],
})
export class QuizPageComponent implements OnInit, OnDestroy {
	quiz$!: Observable<any>;
	private _answers: unknown[] = [];
	isChecked: boolean = false;
	public user: User = {} as any;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _quizService: QuizService,
		private _matDialog: MatDialog,
		//private _highLightService: HighlightService,
		private _metaService: MetaService,
		private _renderer2: Renderer2,
		private _canonicalService: CanonicalService
	) {}

	ngOnInit(): void {
		this._canonicalService.update(this._renderer2);

		if (localStorage.getItem(`user`)) {
			this.user = JSON.parse(localStorage.getItem(`user`) as string);
		}

		this.quiz$ = this._quizService.getQuiz(this._route.snapshot.params["id"]).pipe(
			tap((data: any) => {
				/* set meta data */
				this._metaService.update(
					data["title"],
					data["smallDescr"],
					`${environment.baseUrl}/assets/social-for-quizes.jpg`
				);
				/* fill array */
				data["questions"].forEach((el: any) => {
					this._answers.push(undefined);
				});
			}),
			//tap(() => this._highLightService.highlightAll())
		);
	}

	ngOnDestroy(): void {
		this._canonicalService.remove();
	}

	public delete() {
		const dialog = this._matDialog.open(ConfirmationDialogComponent, {
			data: {
				descr: `დარწმუნებული ხარ რომ გსურს ქვიზის წაშლა?`,
			},
		});

		dialog.afterClosed().subscribe((res) => {
			if (res) {
				this._quizService
					.deleteQuiz(this._route.snapshot.params["id"])
					.subscribe(() => this._router.navigateByUrl(`/quiz-list`));
				return;
			}
		});
	}

	public checkAnswers(i: number, j: number) {
		this._answers[i] = j;
	}

	public confirmation() {
		const dialog = this._matDialog.open(ConfirmationDialogComponent, {
			data: {
				descr: `დარწმუნებული ხარ, რომ გსურს ქვიზის დასრულება?`,
			},
		});

		dialog.afterClosed().subscribe((res) => {
			if (res) {
				this.isChecked = true;
				const data = {
					quizId: this._route.snapshot.params["id"],
					answers: this._answers,
				};
				this._quizService.checkQuiz(data).subscribe(
					(res) => {
						this._matDialog.open(QuizAnswersDialogComponent, {
							width: `420px`,
							data: res,
						});
					},
					(err) => {
						console.log(err.error);
					}
				);
			}
		});
	}
}
