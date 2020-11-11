import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { UsersService } from "src/app/services/users.service";

@Component({
  selector: "app-reseller",
  template: `
    <div class="register-form">
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <h2 class="text-center">Register for API Access</h2>
        <div class="form-group">
          <input
            type="text"
            formControlName="name"
            class="form-control"
            placeholder="Company Name"
            required="required"
          />
          <span
            class="text-danger"
            *ngIf="
              (registerFormControl.name.touched || submitted) &&
              registerFormControl.name.errors?.required
            "
          >
            Name is required
          </span>
        </div>
        <div class="form-group">
          <input
            formControlName="dns"
            type="text"
            class="form-control"
            placeholder="DNS/Site URL (e.g www.example.com)"
            required="required"
          />
          <span
            class="text-danger"
            *ngIf="
              (registerFormControl.dns.touched || submitted) &&
              registerFormControl.dns.errors?.required
            "
          >
            DNS is required
          </span>
        </div>

        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block">
            Register
          </button>
        </div>
      </form>
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
export class ResellerComponent implements OnInit, OnDestroy {
  sub: Subscription;
  submitted = false;
  registerForm: FormGroup;

  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private usersSvc: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      dns: ["", Validators.required],
    });
  }

  get registerFormControl() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      this.showSuccess("Registration succesful!!\n Please login now.");
      this.sub = this.usersSvc
        .registerApiUser(this.registerForm.value)
        .subscribe(
          (resp) => {
            this.showSuccess(
              "Registration succesful!!\n One of our agents will contact you."
            );
            this.router.navigate(["/"]);
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
