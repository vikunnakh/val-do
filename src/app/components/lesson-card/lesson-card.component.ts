import { Component, Input } from '@angular/core';
import { Course } from 'src/app/interfaces/course';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lesson-card',
  templateUrl: './lesson-card.component.html',
  styleUrls: ['./lesson-card.component.scss']
})
export class LessonCardComponent {
	@Input() data!: Course;
	public baseUrl: string = environment.baseUrl;

}
