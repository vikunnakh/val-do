import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { ConfirmationDialogComponent } from "src/app/dialogs/confirmation-dialog/confirmation-dialog.component";
import { Review } from "src/app/interfaces/review";
import { ReviewsService } from "src/app/services/reviews.service";

@Component({
	selector: "app-reviews",
	templateUrl: "./reviews.component.html",
	styleUrls: ["./reviews.component.scss"],
})
export class ReviewsComponent implements OnInit {
	reviews$!: Observable<Review[]>;

	constructor(private _reviewsService: ReviewsService, private _matDialog: MatDialog) {}

	ngOnInit(): void {
		this._initReviews();
	}

	private _initReviews(): void {
		this.reviews$ = this._reviewsService.getAdminReviews();
	}

	delete(courseId: string): void {
		const dialog = this._matDialog.open(ConfirmationDialogComponent, {
			autoFocus: false,
			width: `440px`,
			data: {
				descr: `დარწმუნებული ხარ რომ გსურს შეფასების წაშლა ?`,
			},
		});

		dialog.afterClosed().subscribe((res) => {
			if (res) {
				this._reviewsService.deleteAdminReview(courseId).subscribe(() => this._initReviews());
			}
		});
	}

	publish(courseId: string, isPublished: boolean): void {
		isPublished = !isPublished;

		const dialog = this._matDialog.open(ConfirmationDialogComponent, {
			autoFocus: false,
			width: `440px`,
			data: {
				descr: `დარწმუნებული ხარ რომ გსურს შეფასების ${isPublished ? "გამოჩენა" : "დამალვა"} ?`,
			},
		});

		dialog.afterClosed().subscribe((res) => {
			if (res) {
				this._reviewsService.publishAdminReview({ courseId, isPublished }).subscribe(() => this._initReviews());
			}
		});
	}

	reInit($event: boolean) {
		if ($event) this._initReviews();
	}
}
