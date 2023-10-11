import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { finalize } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
	public form: any;
	public error: boolean = false;

	constructor(
		private _formBuilder: FormBuilder,
		private __loginService: LoginService,
		private _title: Title,
		private _loadingService: LoadingService
	) {}

	ngOnInit(): void {
		this._initForms();
		this._title.setTitle(`✅ სისტემაში შესვლა, ავტორიზაცია`);
	}

	private _initForms() {
		this.form = this._formBuilder.group({
			email: new FormControl(``, [Validators.required, Validators.email, Validators.minLength(5)]),
			password: new FormControl(``, [Validators.required, Validators.minLength(6), Validators.maxLength(1024)]),
		});
	}

	login() {
		this._loadingService.start();
		this.__loginService
			.login(this.form.value)
			.pipe(
				finalize(() => {
					this._loadingService.end();
				})
			)
			.subscribe(
				() => {},
				() => (this.error = true)
			);
			console.log(this.login);
	}
}
