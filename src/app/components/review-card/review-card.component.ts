import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddReviewDialogComponent } from "src/app/dialogs/add-review-dialog/add-review-dialog.component";
import { FullReviewDialogComponent } from "src/app/dialogs/full-review-dialog/full-review-dialog.component";
import { Review } from "src/app/interfaces/review";
import { User } from "src/app/interfaces/user";
import { LoginService } from "src/app/services/login.service";

@Component({
	selector: "app-review-card",
	templateUrl: "./review-card.component.html",
	styleUrls: ["./review-card.component.scss"],
})
export class ReviewCardComponent implements OnInit {
	@Input() review!: Review;
	shortDescr: string = "";
	edit: boolean = false;

	@Output() update: EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor(public loginService: LoginService, private _matDialog: MatDialog) {}

	ngOnInit(): void {
		this.shortDescr = `${this.review.description.slice(0, 50)}${this.review.description.length > 50 ? "..." : ""}`;

		if (this.loginService.isLogged()) {
			if (localStorage.getItem("user")) {
				const user: User = JSON.parse(localStorage.getItem("user")!);
				if (this.review.user.userId == user._id) {
					this.edit = true;
				}
			}
		}
	}

	change() {
		const dialog = this._matDialog.open(AddReviewDialogComponent, {
			width: `440px`,
			data: {
				...this.review,
			},
		});

		dialog.afterClosed().subscribe((data) => {
			if (data) {
				this.update.emit(data);
			}
		});
	}

	expand() {
		this._matDialog.open(FullReviewDialogComponent, {
			width: `440px`,
			autoFocus: false,
			data: this.review,
		});
	}
}
