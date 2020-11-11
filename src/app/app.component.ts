import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { decode } from "punycode";

@Component({
  selector: "app-root",
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img class="logo" src="/assets/images/bookworm.png" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" routerLink="allbooks"
                >All books <span class="sr-only">(current)</span></a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="mybooks">My Books</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <a
              *ngIf="!isUserAuthenticated()"
              routerLink="/login"
              class="btn btn-outline-success my-2 my-sm-0"
              type="button"
            >
              Login
            </a>
            <button
              *ngIf="isUserAuthenticated()"
              (click)="logout()"
              class="btn btn-danger my-2 my-sm-0"
              type="button"
            >
              {{ emailaddress }} ( Logout )
            </button>
          </form>
        </div>
      </div>
    </nav>

    <main role="main">
      <router-outlet></router-outlet>
    </main>

    <footer class="container">
      <p>© Books Online 2020</p>
    </footer>
  `,
  styles: [],
})
export class AppComponent {
  title = "Book Online";
  emailaddress: string;

  constructor(private jwtHelper: JwtHelperService, private router: Router) {}

  isUserAuthenticated() {
    const token: string = localStorage.getItem("loginToken");
    const decodedToken = this.jwtHelper.decodeToken(token);

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      this.emailaddress =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
        ];
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem("loginToken");
    this.router.navigate(["/"]);
  }
}
