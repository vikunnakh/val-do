import { Component, OnInit } from '@angular/core';
import { catchError, mergeMap, Observable, throwError } from 'rxjs';
import { Course } from 'src/app/interfaces/course';
import { CoursesService } from 'src/app/services/courses.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public $favorites!: Observable<Course[]>;

	constructor(private _userService: UserService, private _coursesService: CoursesService) {}

	ngOnInit(): void {
		this.$favorites = this._userService.getUser().pipe(
			mergeMap((res: any) => {
				return this._coursesService.getFavorites(res["favorites"]);
			}),
			catchError((err) => {
				console.log(err.error);
				return throwError(err);
			})
		);
	}
}
