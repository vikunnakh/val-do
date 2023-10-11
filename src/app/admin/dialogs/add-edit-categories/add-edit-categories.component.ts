import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mergeMap, Observable } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { environment } from 'src/environments/environment';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-add-edit-categories',
  templateUrl: './add-edit-categories.component.html',
  styleUrls: ['./add-edit-categories.component.scss']
})
export class AddEditCategoriesComponent {
  public form!: FormGroup;
	public category$!: Observable<Category>;
	public baseUrl: string = environment.baseUrl;
	public selectedImage!: File;

	constructor(
		private _matDialogRef: MatDialogRef<AddEditCategoriesComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { mode: string; id: string },
		private _categoryServices: CategoriesService,
		private _courseService: CourseService,
		private _formBuilder: FormBuilder
	) {}

	ngOnInit(): void {
		this._initForm();
		if (this.data.mode == `edit`) {
			this._categoryServices.getCategory(this.data.id).subscribe((category) => {
				this.form.patchValue(category);
			});
		}
	}

	/* edit cat */
	submit() {
		if (this.selectedImage || this.data.mode != `edit`) {
			this._courseService
				.uploadImage(this.selectedImage)
				.pipe(
					mergeMap((data: any) => {
						this.form.get(`img`)?.patchValue(data[`path`]);
						const category: Category = {
							id: this.data.id,
							...this.form.value,
						};
						if (this.data.mode == `edit`) return this._categoryServices.editCategory(category);
						return this._categoryServices.addCategory(category);
					})
				)
				.subscribe(
					() => {
						this.close(true);
					},
					(err) => {
						console.log(err.error);
					}
				);
			return;
		}
		const category: Category = {
			id: this.data.id,
			...this.form.value,
		};
		this._categoryServices.editCategory(category).subscribe(() => {
			this.close(true);
		});
	}

	/* init form data */
	private _initForm() {
		this.form = this._formBuilder.group({
			title: new FormControl(``, [Validators.required]),
			metaDescr: new FormControl(``, [Validators.required]),
			descr: new FormControl(``, [Validators.required]),
			metaKeyword: new FormControl(``),
			metaAuthor: new FormControl(``),
			img: new FormControl(``, [Validators.required]),
			isFavorite: new FormControl(false),
		});
	}

	/* select image */
	onFileSelect(event: any) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.selectedImage = file;
		}
	}

	/* close */
	close(success: boolean) {
		this._matDialogRef.close(success);
	}
}
