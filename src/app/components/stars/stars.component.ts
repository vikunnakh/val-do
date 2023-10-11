import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: "app-stars",
	templateUrl: "./stars.component.html",
	styleUrls: ["./stars.component.scss"],
})
export class StarsComponent implements OnInit {
	@Input() stars!: number;
	starsArr: boolean[] = [];

	constructor() {}

	ngOnInit(): void {
		for (let i = 0; i < 5; i++) {
			i < this.stars ? this.starsArr.push(true) : this.starsArr.push(false);
		}
	}
}
