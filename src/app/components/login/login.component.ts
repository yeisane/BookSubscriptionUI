import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthServiceService } from "src/app/services/auth-service.service";

@Component({
  selector: "app-login",
  template: `
    <div class="login-form">
      <form [formGroup]="loginform" (ngSubmit)="login()">
        <h2 class="text-center">Log in</h2>
        <div class="form-group">
          <input
            type="text"
            formControlName="email"
            class="form-control"
            placeholder="Username"
            required="required"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            formControlName="password"
            class="form-control"
            placeholder="Password"
            required="required"
          />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">
            Log in
          </button>
          <p>{{ errorMessage }}</p>
        </div>
      </form>
      <p class="text-center"><a routerLink="/register">Create an Account</a></p>
    </div>
  `,
  styles: [
    `
      .login-form {
        width: 340px;
        margin: 150px auto;
        font-size: 15px;
      }
      .login-form form {
        margin-bottom: 15px;
        background: #fff;
        padding: 30px;
      }
      .login-form h2 {
        margin: 0 0 15px;
      }
      .form-control,
      .btn {
        min-height: 38px;
        border-radius: 2px;
      }
      .btn {
        font-size: 15px;
        font-weight: bold;
      }
    `,
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  sub: Subscription;
  loginform: FormGroup;
  loginFailed = false;
  errorMessage = "";

  constructor(private auth: AuthServiceService, private router: Router) {}

  ngOnInit(): void {
    this.loginform = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  login() {
    this.sub = this.auth.login(this.loginform.value).subscribe(
      (resp: any) => {
        this.loginFailed = false;
        this.errorMessage = "";
        localStorage.setItem("loginToken", resp.token);
        this.router.navigate(["/allbooks"]);
      },
      (error) => {
        this.loginFailed = true;
        this.errorMessage = error.statusText + ". Login failed";
      }
    );
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
