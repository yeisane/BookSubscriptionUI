import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  template: `
    <div class="jumbotron">
      <div class="container text-center">
        <h1 class="big-header">
          Reading books is cool<br />
          again.
        </h1>
        <p>
          Kidding, that never changed. Choose from our wide selection and
          starting reading today.
        </p>
        <p>
          <a routerLink="/register" class="btn btn-primary btn-lg" role="button"
            >Sign up »</a
          >
          <a
            routerLink="reseller"
            class="btn btn-light btn-lg ml-2"
            role="button"
            >Become a reseller »</a
          >
        </p>
        <p>Already a member? <a routerLink="/login">Sign in.</a></p>
      </div>
    </div>

    <div>
      <div class="marketing-bg"></div>
      <hr />
    </div>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
