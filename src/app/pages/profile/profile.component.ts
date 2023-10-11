import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize, map, Observable } from "rxjs";
import { ConfirmationDialogComponent } from "src/app/dialogs/confirmation-dialog/confirmation-dialog.component";
import { CvDialogComponent } from "src/app/dialogs/cv-dialog/cv-dialog.component";
import { Cv } from "src/app/interfaces/cv";
import { User } from "src/app/interfaces/user";
import { CvService } from "src/app/services/cv.service";
import { LoadingService } from "src/app/services/loading.service";
import { UserService } from "src/app/services/user.service";
import { environment } from "src/environments/environment";

@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
	public $userData!: Observable<{ user: User; cv: Cv }>;
	public baseUrl: string = environment.baseUrl;
	public prev: any;

	constructor(
		private _userService: UserService,
		private _loadingService: LoadingService,
		private _title: Title,
		private _matDialog: MatDialog,
		private _route: ActivatedRoute,
		private _router: Router,
    private _cvService: CvService
	) {}

	ngOnInit(): void {
		this._title.setTitle(`🤖 ჩემი პროფილი`);
		this._initUser();
	}

	private _initUser() {
		this.$userData = this._userService.getUser().pipe(
			map((res: { user: User; cv: Cv }) => {
				if (this._route.snapshot.queryParams["add-resume"]) {
					res.cv ? this.edit(res.cv._id) : this.addCv();
				}
				return res;
			})
		);
	}

	delete(id: any) {
		const dialog = this._matDialog.open(ConfirmationDialogComponent, {
			width: `440px`,
			data: {
				descr: `ნამდვილად გსურთ ფოტოს წაშლა?`,
			},
		});

		dialog.afterClosed().subscribe((res) => {
			if (res) {
				this._userService.delete(id).subscribe(() => this._initUser());
				this.prev = undefined;
			}
		});
	}

	fileSelect(file: any) {
		const image: File = file.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);

		reader.onload = () => {
			this.prev = reader.result;
		};

		this._loadingService.start();
		// ფოტოს ატვირთვა
		this._userService
			.uploadProfilePhoto(image)
			.pipe(finalize(() => this._loadingService.end()))
			.subscribe(() => this._initUser());
	}

	deleteCv() {
		const dialog = this._matDialog.open(ConfirmationDialogComponent, {
			width: `440px`,
			data: {
				descr: `ნამდვილად გსურთ CV-ის წაშლა?`,
			},
		});

		dialog.afterClosed().subscribe((res) => {
			if (res) {
				this._cvService.deleteCv().subscribe(() => this._initUser());
			}
		});
	}

	addCv() {
		const dialog = this._matDialog.open(CvDialogComponent);

		dialog.afterClosed().subscribe((res) => {
			if (res) this._initUser();
		});
	}

	edit(id: any) {
		const dialog = this._matDialog.open(CvDialogComponent, {
			data: id,
		});

		dialog.afterClosed().subscribe((res) => {
			if (res) {
				this._initUser();
				this._router.navigateByUrl("/profile");
			}
		});
	}
}
