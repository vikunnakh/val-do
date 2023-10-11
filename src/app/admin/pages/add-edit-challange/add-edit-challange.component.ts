import { Component, OnInit,  } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize, mergeMap, Observable } from "rxjs";
import { ChallangesService } from "src/app/services/challanges.service";
import { LoadingService } from "src/app/services/loading.service";
import { TagsService } from "src/app/services/tags.service";
import { CourseService } from "../../services/course.service";

@Component({
	selector: "app-add-edit-challange",
	templateUrl: "./add-edit-challange.component.html",
	styleUrls: ["./add-edit-challange.component.scss"],
})
export class AddEditChallangeComponent implements OnInit {
	public form!: FormGroup;
	public tags$!: Observable<any[]>;
	public selectedImage!: File;
	public edit: boolean = false;

	constructor(
		private _formBuilder: FormBuilder,
		private _tagsService: TagsService,
		private _CourseService: CourseService,
		private _ChallangesService: ChallangesService,
		private _route: ActivatedRoute,
		private _router: Router,
		private _title: Title,
		private _loadingService: LoadingService
	) {}

	ngOnInit(): void {
		this._initForm();
		this.tags$ = this._tagsService.getTags();
		this.setData();
	}

	/* set edit data for fields */
	setData() {
		interface Params {
			id: string;
			edit: boolean;
		}

		const params: Params = this._route.snapshot.queryParams as any;
		if (params.id && params.edit) {
			this._title.setTitle(`გამოწვევის რედაქტირება`);
			this.edit = params.edit;
			this._ChallangesService.getChallenge(params.id).subscribe((res) => {
				this.form.patchValue(res);
			});
			return;
		}
		this.edit = false;
		this._title.setTitle(`გამოწვევის დამატება`);
	}

	private _initForm() {
		this.form = this._formBuilder.group({
			_id: new FormControl(),
			title: new FormControl(``, [Validators.required]),
			smallDescr: new FormControl(``, [Validators.required]),
			descr: new FormControl(``, [Validators.required]),
			img: new FormControl(``, [Validators.required]),
			tags: new FormControl(``, [Validators.required]),
			level: new FormControl(``, [Validators.required]),
		});
	}

	/* select image */
	public onFileSelect(event: any) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.selectedImage = file;
		}
	}

	/* add */
	public submit() {
		this._loadingService.start();
		if (!this.edit) {
			/* add */
			this._CourseService
				.uploadImage(this.selectedImage)
				.pipe(
					mergeMap((img: any) => {
						this.form.get(`img`)?.patchValue(img[`path`]);
						return this._ChallangesService.addChallenge(this.form.value);
					}),
					finalize(() => this._loadingService.end())
				)
				.subscribe(
					(res) => this._router.navigateByUrl(`/challenge/${res._id}`),
					(err) => {
						console.log(err.error);
					}
				);
			return;
		}
		/* edit */
		if (this.selectedImage) {
			/* is image is changed */
			this._CourseService
				.uploadImage(this.selectedImage)
				.pipe(
					mergeMap((img: any) => {
						this.form.get(`img`)?.patchValue(img[`path`]);
						return this._ChallangesService.editChallenge(this.form.value);
					}),
					finalize(() => this._loadingService.end())
				)
				.subscribe(
					(res) => this._router.navigateByUrl(`/challenge/${res._id}`),
					(err) => {
						console.log(err.error);
					}
				);
			return;
		}
		this._ChallangesService
			.editChallenge(this.form.value)
			.pipe(finalize(() => this._loadingService.end()))
			.subscribe(
				(res) => this._router.navigateByUrl(`/challenge/${res._id}`),
				(err) => {
					console.log(err.error);
				}
			);
	}
}
