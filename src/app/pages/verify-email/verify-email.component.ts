import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Verify } from 'src/app/interfaces/verify';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {
  public code: FormControl = new FormControl(``, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
  public email: string = ``;
  public error: boolean = false;

  constructor(
    private _loginService: LoginService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _title: Title
  ) {}
  
  ngOnInit(): void {
    this._title.setTitle(`👻 ვერიფიკაცია`);
    this.email = this._route.snapshot.queryParams[`email`];
  }

  verify() {
    const data: Verify = {
      email: this.email,
      code: this.code.value
    };
    this._loginService.verify(data).subscribe(
      () => {
        this._router.navigateByUrl(`profile`);
      },
      (err) => {
        this.error = true;
        console.log(err.error);
      }
    )
  }
}
