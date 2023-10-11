import { Component, Inject, OnInit, Optional, PLATFORM_ID } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { finalize, Observable, tap } from "rxjs";
import { CategoryCardComponent } from "src/app/components/category-card/category-card.component";
import { Category } from "src/app/interfaces/category";
import { Course } from "src/app/interfaces/course";
import { CoursesService } from "src/app/services/courses.service";
import { LoadingService } from "src/app/services/loading.service";
import { MetaService } from "src/app/services/meta.service";
import { environment } from "src/environments/environment";

@Component({
	selector: "app-lessons",
	templateUrl: "./lessons.component.html",
	styleUrls: ["./lessons.component.scss"],
})
export class LessonsComponent implements OnInit {
	public courses$!: Observable<Course[]>;
	public params!: Params;
	public id!: string;
	public jsonLd: any;
	filteredOptions$!: Observable<any>;
	public categories$!: Observable<Category[]>;


	constructor(
		private _coursesService: CoursesService,
		private _route: ActivatedRoute,
		private _loadingService: LoadingService,
		private _metaService: MetaService
	) {}

	ngOnInit(): void {
		this.id = this._route.snapshot.params["id"];
		this._route.queryParams.subscribe((params: Params) => {
			this.params = params;
			if (!params) {
				this.intitCourses();
			} else {
				this.intitCourses(params);
			}
		});
	}

	intitCourses(params?: any) {
		// this._loadingService.start();
		this.courses$ = this._coursesService.getCourses(this.id, params).pipe(
			// tap((courses) => {
			// 	if (courses.length) {
			// 		this._metaService.update(courses[0].title, courses[0].descr, `${environment.baseUrl}/${courses[0].img}`);
			// 		const list: any = [];

			// 		courses.forEach((course, i) => {
			// 			list.push({
			// 				"@type": "ListItem",
			// 				position: i + 1,
			// 				item: {
			// 					"@id": `https://val-do.com/categories/${course._id}`,
			// 					name: course.title,
			// 				},
			// 			});
			// 		});

			// 		this.jsonLd = {
			// 			"@context": "https://schema.org",
			// 			"@type": "Course",
			// 			name: courses[0].title,
			// 			description: courses[0].descr.replace(/(<([^>]+)>)/gi, "").slice(0, 145),
			// 			provider: {
			// 				"@type": "Organization",
			// 				name: "Val Do",
			// 				sameAs: "http://val-do.com",
			// 			},
			// 			itemListElement: list,
			// 		};
			// 	}
			// }),

			// finalize(() => {
			// 	this._loadingService.end();
			// })
		);
	}
}
