import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { finalize } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  public form: FormGroup | any;
	public error: boolean = false;
	public errorMessage: string = "";

	constructor(
		private _formBuilder: FormBuilder,
		private _loginService: LoginService,
		private _title: Title,
		private _loadingService: LoadingService
	) {}

	ngOnInit(): void {
		this._title.setTitle(`😎 რეგისტრაცია`);
		this._initForm();
	}

	private _initForm() {
		this.form = this._formBuilder.group({
			firstName: new FormControl(``, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
			lastName: new FormControl(``, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]),
			phone: new FormControl(``, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
			email: new FormControl(``, [
				Validators.required,
				Validators.minLength(6),
				Validators.maxLength(255),
				Validators.email,
			]),
			password: new FormControl(``, [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
			rePassword: new FormControl(``, [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
		});
	}

	registration() {
		this._loadingService.start();
		this._loginService
			.registration(this.form.value)
			.pipe(
				finalize(() => {
					this._loadingService.end();
				})
			)
			.subscribe(
				() => {},
				(err) => {
					this.error = true;
					this.errorMessage = err.error;
				}
			);
			console.log(this.registration);
	}
}