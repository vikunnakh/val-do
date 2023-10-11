import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Course } from 'src/app/interfaces/course';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  courses$!: Observable<Course[]>
  constructor(
    public route: ActivatedRoute,
    private _coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.courses$ = this._coursesService.getCoursesByTags(this.route.snapshot.params['id']);
  }

}
