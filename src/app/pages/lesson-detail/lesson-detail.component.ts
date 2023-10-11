import { DOCUMENT } from "@angular/common";
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, Renderer2 } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { ReCaptchaV3Service } from "ng-recaptcha";
import { catchError, finalize, map, mergeMap, Observable, switchMap, tap, throwError } from "rxjs";
import { ConfirmationDialogComponent } from "src/app/dialogs/confirmation-dialog/confirmation-dialog.component";
import { Comment } from "src/app/interfaces/comment";
import { Course } from "src/app/interfaces/course";
import { User } from "src/app/interfaces/user";
import { CanonicalService } from "src/app/services/canonical.service";
import { CommentService } from "src/app/services/comment.service";
import { CoursesService } from "src/app/services/courses.service";
import { HighLightService } from "src/app/services/highlight.service";
import { LoadingService } from "src/app/services/loading.service";
import { LoginService } from "src/app/services/login.service";
import { MetaService } from "src/app/services/meta.service";
import { environment } from "src/environments/environment";

@Component({
	selector: "app-lesson-detail",
	templateUrl: "./lesson-detail.component.html",
	styleUrls: ["./lesson-detail.component.scss"],
	providers: [HighLightService],
})
export class LessonDetailComponent implements OnInit, OnDestroy {
	public course$!: Observable<Course>;
	public comments: Comment[] = [];
	public user: User = {} as any;
	public isFavorite: boolean = false;
	public baseUrl: string = environment.baseUrl;
	public jsonLd: any;
	public commentText: FormControl = new FormControl(``, [Validators.required, Validators.minLength(5)]);
	public loader: boolean = false;

	constructor(
		private _coursesService: CoursesService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _loginService: LoginService,
		private _loadingService: LoadingService,
		private _highlightService: HighLightService,
		private _commentService: CommentService,
		private _recaptchaV3Service: ReCaptchaV3Service,
		private _matDialog: MatDialog,
		private _metaService: MetaService,
		@Inject(DOCUMENT) private _document: Document,
		private _renderer2: Renderer2,
		private _canonicalService: CanonicalService
	) {}

	ngOnInit(): void {
		this._canonicalService.update(this._renderer2);

		this.course$ = this._route.params.pipe(
			tap(() => this._loadingService.start()),
			switchMap((params) =>
				this._coursesService.getCourse(params["id"]).pipe(
					tap((res) => {
						/* meta and titles */
						this._metaService.update(res.title, res.descr, `${environment.baseUrl}/${res.img}`);
						if (localStorage.getItem(`user`)) {
							const user: User = JSON.parse(localStorage.getItem(`user`) as string);
							if (!user.favorites.includes(this._route.snapshot.params["id"])) {
								this.isFavorite = true;
							}
						} else {
							this.isFavorite = true;
						}

						/* json ld init */
						this.jsonLd = {
							"@context": "https://schema.org",
							"@type": "Course",
							name: res.title,
							description: res.descr.replace(/(<([^>]+)>)/gi, "").slice(0, 145),
							image: [`${environment.baseUrl}/${res.img}`],
							provider: {
								"@type": "Person",
								name: "Val Do",
								sameAs: "https://twitter.com/va1_do",
							},
						};
					}),
					mergeMap((course) => {
						return this._coursesService.getCourses(course.category).pipe(
							map((allCourses) => {
								return {
									all: [...allCourses],
									...course,
								};
							})
						);
					}),
					finalize(() => {
						this._loadingService.end();
						this._highlightService.highlightAll();
					}),
					catchError((err) => {
						console.log(err.error);
						return throwError(err);
					})
				)
			)
		);
		/* get comments */
		this._commentService.getComments(this._route.snapshot.params["id"]).subscribe(
			(comments) => {
				this.comments = comments;
			},
			(err) => {
				console.log(err.error);
			}
		);
		this._isAdmin();
	}

	ngOnDestroy(): void {
		this._canonicalService.remove();
	}

	private _isAdmin() {
		if (localStorage.getItem(`user`)) {
			this.user = JSON.parse(localStorage.getItem(`user`) as string);
		}
	}

	addToFavorites() {
		if (this._loginService.isLogged()) {
			this._coursesService
				.addToFavs(this._route.snapshot.params["id"])
				.pipe(
					tap((res) => {
						localStorage.setItem(`user`, JSON.stringify(res));
					})
				)
				.subscribe();
			this.isFavorite = false;
		} else {
			this._router.navigateByUrl(`auth`);
		}
	}

	deleteFromFavs() {
		if (this._loginService.isLogged()) {
			this.isFavorite = true;
			this._coursesService
				.deleteFromFavs(this._route.snapshot.params["id"])
				.pipe(
					tap((res) => {
						localStorage.setItem(`user`, JSON.stringify(res));
					})
				)
				.subscribe();
		} else {
			this._router.navigateByUrl(`auth`);
		}
	}

	/* add new comment */
	addComment() {
		if (this._loginService.isLogged()) {
			const user = JSON.parse(localStorage.getItem(`user`)!);
			this._recaptchaV3Service
				.execute("importantAction")
				.pipe(
					tap(() => (this.loader = true)),
					switchMap((token) => {
						const data: Comment = {
							userId: user._id,
							firstName: user.firstName,
							lastName: user.lastName,
							comment: this.commentText.value,
						};
						const recaptchaData = {
							...data,
							token,
						};
						return this._commentService.addComment(this._route.snapshot.params["id"], recaptchaData);
					}),
					finalize(() => (this.loader = false))
				)
				.subscribe(
					(comment) => {
						this.comments.unshift(comment);
					},
					(err) => {
						console.log(err.error);
					}
				);
			return;
		}
		this._router.navigateByUrl(`/auth`);
	}

	/* delete comment */
	deleteComment(commentId: string, index: number) {
		const dialog = this._matDialog.open(ConfirmationDialogComponent, {
			width: `440px`,
			data: {
				descr: `დარწმუნებული ხართ, რომ გსურსთ კომენტარის წაშლა ?`,
			},
		});

		dialog.afterClosed().subscribe((res) => {
			if (res) {
				this.comments.splice(index, 1);
				this._commentService.deleteComment(commentId).subscribe();
			}
		});
	}
}
