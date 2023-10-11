import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginGuard } from 'src/app/guards/auth.guard';
import { SetPassword } from 'src/app/interfaces/set-password';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent {
  public form: FormGroup | any;

  public success: boolean = false;
  public successMessage: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService
  ) {}

  ngOnInit(): void {
    this._initForm();
    console.log(this._route.snapshot.queryParams);
  }

  private _initForm() {
    this.form = this._formBuilder.group({
      password: new FormControl(``, [Validators.required, Validators.minLength(8), Validators.maxLength(1024)]),
      rePassword: new FormControl(``, [Validators.required, Validators.minLength(8), Validators.maxLength(1024)])
    });
  }

  setPassword() {
    const data: SetPassword = {
      email: this._route.snapshot.queryParams[`email`],
      token: this._route.snapshot.queryParams['token'],
      password: this.form.get('password').value,
    };
    this._loginService.setPassword(data).subscribe(
      (res: any) => {
        this.success = true;
        this.successMessage = res['data'];
        setTimeout(() => {
          this._router.navigateByUrl('/auth')
        }, 3000);
      },
      (err) => {
        this.success = false;
      }
    )
  }
}
