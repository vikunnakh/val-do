import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, mergeMap, Observable } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { LoadingService } from 'src/app/services/loading.service';
import { TagsService } from 'src/app/services/tags.service';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  public form!: FormGroup;
	public selectedImage!: File;
	public $tags!: Observable<any[]>;
	public categories$!: Observable<Category[]>;

	constructor(
		private _courseService: CourseService,
		private _formBuilder: FormBuilder,
		private _router: Router,
		private _tagsService: TagsService,
		private _loadingService: LoadingService,
		private _categoriesService: CategoriesService
	) {}

	ngOnInit(): void {
		this._initForm();
		this.$tags = this._tagsService.getTags();
		this.categories$ = this._categoriesService.getCategories();
	}

	/* init form */
	private _initForm() {
		this.form = this._formBuilder.group({
			title: new FormControl(``, [Validators.required, Validators.minLength(10), Validators.maxLength(255)]),
			descr: new FormControl(``, [Validators.required, Validators.minLength(10)]),
			youtubeLink: new FormControl(``, [Validators.minLength(10), Validators.maxLength(5000)]),
			telegramLink: new FormControl(null, [Validators.minLength(10), Validators.maxLength(5000)]),
			repoLink: new FormControl(null, [Validators.minLength(10), Validators.maxLength(5000)]),
			img: new FormControl(``),
			category: new FormControl(``, [Validators.required]),
			iframe: new FormControl(``),
			tags: new FormControl([], [Validators.required]),
		});
	}

	/* select image */
	onFileSelect(event: any) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.selectedImage = file;
		}
	}

	/* add new course */
	addCourse() {
		this._loadingService.start();
		this._courseService
			.uploadImage(this.selectedImage)
			.pipe(
				mergeMap((img: any) => {
					this.form.get(`img`)!.patchValue(img["path"]);
					return this._courseService.addCourse(this.form.value);
				}),
				finalize(() => {
					this._loadingService.end();
				})
			)
			.subscribe(
				(res: any) => {
					this._router.navigateByUrl(`lessons/${res["id"]}`);
				},
				(err) => {
					console.log(err.error);
				}
			);
	}
}
