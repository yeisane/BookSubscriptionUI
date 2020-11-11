import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-register",
  template: `
    <div class="register-form">
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <h2 class="text-center">Register</h2>
        <div class="form-group">
          <input
            formControlName="firstname"
            type="text"
            class="form-control"
            placeholder="First Name"
            required="required"
          />
          <span
            class="text-danger"
            *ngIf="
              (registerFormControl.firstname.touched || submitted) &&
              registerFormControl.firstname.errors?.required
            "
          >
            Name is required
          </span>
        </div>
        <div class="form-group">
          <input
            formControlName="lastname"
            type="text"
            class="form-control"
            placeholder="Surname"
            required="required"
          />
          <span
            class="text-danger"
            *ngIf="
              (registerFormControl.lastname.touched || submitted) &&
              registerFormControl.lastname.errors?.required
            "
          >
            Surname is required
          </span>
        </div>
        <div class="form-group">
          <input
            formControlName="email"
            type="text"
            class="form-control"
            placeholder="Email"
            required="required"
          />
          <span
            class="text-danger"
            *ngIf="
              (registerFormControl.email.touched || submitted) &&
              registerFormControl.email.errors?.required
            "
          >
            Email is required
          </span>
          <span
            class="text-danger"
            *ngIf="
              registerFormControl.email.touched &&
              registerFormControl.email.errors?.email
            "
          >
            Enter a valid email address
          </span>
        </div>
        <div class="form-group">
          <input
            formControlName="password"
            type="password"
            class="form-control"
            placeholder="Password"
            required="required"
          />
          <span
            class="text-danger"
            *ngIf="
              (registerFormControl.password.touched || submitted) &&
              registerFormControl.password.errors?.required
            "
          >
            Password is required
          </span>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">
            Register
          </button>
        </div>
      </form>
      <p class="text-center"><a routerLink="/login">Login</a></p>
    </div>
  `,
  styles: [
    `
      .register-form {
        width: 340px;
        margin: 150px auto;
        font-size: 15px;
      }
      .register-form form {
        margin-bottom: 15px;
        background: #fff;
        padding: 30px;
      }
      .register-form h2 {
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
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  submitted = false;
  sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private usersSvc: UsersService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      role: ["subscriber"],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.sub = this.usersSvc.registerUser(this.registerForm.value).subscribe(
        (resp) => {
          this.showSuccess("Registration succesful!!\n Please login now.");
          this.router.navigate(["/login"]);
        },
        (error) => {
          this.showFailure("Something went wrong");
          console.log(error);
        }
      );
    }
  }

  showSuccess(message: string) {
    this.toastr.success(message, "Register");
  }

  showFailure(message: string) {
    this.toastr.error(message, "Register");
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
