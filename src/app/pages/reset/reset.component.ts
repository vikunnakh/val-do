import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { LoadingService } from 'src/app/services/loading.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent {
  public success: boolean = false;
  public successMessage: string = '';

  public error: boolean = false;
  public errorMessage: string = '';

  constructor(
    private _loginService: LoginService,
    private _title: Title,
    private _loadingService: LoadingService
  ){}

  ngOnInit():void {
    this._title.setTitle('პაროლის აღდგენა')
  }
  public email: FormControl = new FormControl('', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(250)]);


  reset() {
    this._loadingService.start();
    this._loginService.reset({email: this.email.value}).subscribe(
      (res: any) => {
        this._loadingService.end();
        this.success = true;
        this.successMessage = res['data'];
        this.error = false;
      },
      (err) => {
        this._loadingService.end();
        this.success = false;
        this.error = true;
        this.errorMessage = err.error;
        console.log(err.error);
      }
    )
  }
}
