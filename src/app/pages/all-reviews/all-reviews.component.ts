import { Component, OnInit } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Review } from "src/app/interfaces/review";
import { MetaService } from "src/app/services/meta.service";
import { ReviewsService } from "src/app/services/reviews.service";

@Component({
	selector: "app-all-reviews",
	templateUrl: "./all-reviews.component.html",
	styleUrls: ["./all-reviews.component.scss"],
})
export class AllReviewsComponent implements OnInit {
	reviews$?: Observable<Review[]>;

	constructor(private _reviewService: ReviewsService, private _metaService: MetaService) {}

	ngOnInit(): void {
		this._init();
	}

	private _init(): void {
		this.reviews$ = this._reviewService
			.getReviews()
			.pipe(tap((reviews) => this._metaService.update(`val-do.com-ის შეფასებები`, reviews[0].description)));
	}

	reInit($event: boolean): void {
		if ($event) this._init();
	}
}
