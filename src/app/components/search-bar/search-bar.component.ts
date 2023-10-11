import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, Observable } from 'rxjs';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchControl: FormControl = new FormControl('');
  filteredOptions$!: Observable<any>;

  constructor(
    private _courseService: CoursesService
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(500)).subscribe((keyword) => (this.filteredOptions$ = this._courseService.search(keyword)));
  }
}
