import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, mergeMap, Observable } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { Course } from 'src/app/interfaces/course';
import { CategoriesService } from 'src/app/services/categories.service';
import { CoursesService } from 'src/app/services/courses.service';
import { TagsService } from 'src/app/services/tags.service';
import { environment } from 'src/environments/environment';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  public form!: FormGroup;
  public course!: Course;
  public baseUrl: string = environment.baseUrl;
  public loading: boolean = false;
  public tags$!: Observable<any[]>;
  public categories$!: Observable<Category[]>;
  public selectedImage!: File;
  private _oldPath: string = '';

  constructor(
    private _courseSservice: CoursesService,
    private _courseService: CourseService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _tagsService: TagsService,
    private _categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.tags$ = this._tagsService.getTags();
		this.categories$ = this._categoriesService.getCategories();
		this._courseSservice.getCourse(this._route.snapshot.params["id"]).subscribe((res) => {
			this.course = res;
			this._oldPath = this.course.img;
			this._initForms();
		});
  }

  _initForms() {
    this.form = this._fb.group({
      title: new FormControl(this.course.title, [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(20)
      ]),
      descr: new FormControl(this.course.descr, [Validators.required, Validators.minLength(10)]),
			youtubeLink: new FormControl(this.course.youtubeLink, [Validators.minLength(10), Validators.maxLength(5000)]),
			telegramLink: new FormControl(this.course.telegramLink, [Validators.minLength(10), Validators.maxLength(5000)]),
			repoLink: new FormControl(this.course.repoLink, [Validators.minLength(10), Validators.maxLength(5000)]),
			img: new FormControl(this.course.img, [Validators.required]),
			category: new FormControl(this.course.category, [Validators.required]),
			iframe: new FormControl(this.course.iframe),
			tags: new FormControl(this.course.tags),
    });
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedImage = file;
    }
  }


  editCourse() {
    this.loading = true;
    if (this.selectedImage) {
      this._courseService.uploadImage(this.selectedImage).pipe(
        finalize(() => {
          this.loading = true;
          this._router.navigateByUrl('/categories');
        }),
        mergeMap((res: any) => {
          this.form.get('img')?.patchValue(res['path']);
          let data = {
            ...this.form.value,
            oldPath: this._oldPath
          };
          return this._courseService.editCourse(this._route.snapshot.params['id'], data);
        })
      ).subscribe();
    } else {
      this._courseService.editCourse(this._route.snapshot.params['id'], this.form.value).pipe(
        finalize(() => {
          this.loading = false;
          this._router.navigateByUrl(`/lesson/${this._route.snapshot.params['id']}`);
        })
      ).subscribe();
    }
  }
}
