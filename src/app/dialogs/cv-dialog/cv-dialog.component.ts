import { ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { map, Observable } from "rxjs";
import { CvService } from "src/app/services/cv.service";

@Component({
	selector: "app-cv-dialog",
	templateUrl: "./cv-dialog.component.html",
	styleUrls: ["./cv-dialog.component.scss"],
})
export class CvDialogComponent implements OnInit {
	form!: FormGroup;
	tags$!: Observable<any>;

	languages: { title: string }[] = [
		{ title: "ქართული" },
		{ title: "ინგლისური" },
		{ title: "ესპანური" },
		{ title: "რუსული" },
		{ title: "გერმანული" },
		{ title: "ფრანგული" },
		{ title: "თურქული" },
	];

	constructor(
		private _fb: FormBuilder,
		private _cvService: CvService,
		@Inject(MAT_DIALOG_DATA) public id: string,
		private _matDialogRef: MatDialogRef<CvDialogComponent>,
		private _changeDetectionRef: ChangeDetectorRef
	) {}

	ngOnInit(): void {
		this.initForm();
		// set form data
		if (this.id) {
			this._cvService.getCv(this.id).subscribe((data) => {
				data.education.forEach(() => {
					this.addNewEducation();
				});
				data.experience.forEach(() => {
					this.addNewExperience();
				});

				this.form.patchValue(data);
				this._changeDetectionRef.detectChanges();
			});
		} else {
			this.addNewEducation();
			this.addNewExperience();
		}

		this.tags$ = this._cvService.getSkills().pipe(
			map((data) => {
				let newData: any[] = [];

				data.forEach((el: any) => {
					newData.push({ title: el.title });
				});

				return newData;
			})
		);
	}

	get experience(): FormArray {
		return this.form.controls["experience"] as FormArray;
	}

	get education(): FormArray {
		return this.form.controls["education"] as FormArray;
	}

	initForm() {
		this.form = this._fb.group({
			role: ["", [Validators.required, Validators.maxLength(255)]],
			about: ["", [Validators.required, Validators.maxLength(5000)]],
			location: ["", [Validators.required, Validators.maxLength(55)]],
			address: ["", [Validators.required, Validators.maxLength(255)]],
			skills: ["", [Validators.required]],
			languages: ["", [Validators.required]],
			experience: this._fb.array([]),
			education: this._fb.array([]),
		});
	}

	private _expEduFormGroup(): FormGroup {
		return this._fb.group({
			title: ["", [Validators.required]],
			descr: ["", [Validators.required]],
			startDate: ["", [Validators.required]],
			endDate: ["", [Validators.required]],
		});
	}

	public addNewExperience() {
		this.experience.push(this._expEduFormGroup());
	}

	public removeNewExperience(i: number) {
		this.experience.removeAt(i);
	}

	public addNewEducation() {
		this.education.push(this._expEduFormGroup());
	}

	public removeNewEducation(i: number) {
		this.education.removeAt(i);
	}

	submit() {
		if (!this.id) {
			this._cvService.addCv(this.form.value).subscribe(
				() => {
					this._matDialogRef.close(true);
				},
				(err) => {
					console.log(err);
				}
			);
			return;
		}

		this._cvService.editCv(this.form.value).subscribe(() => {
			this._matDialogRef.close(true);
		});
	}
}
