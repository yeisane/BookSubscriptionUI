import { Component, OnInit } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthServiceService } from "src/app/services/auth-service.service";
import { BooksService } from "src/app/services/books.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-allbooks",
  template: `
    <div class="gap-above container text-center">
      <p class="big-header">Treat your shelf to a book subscription.</p>
      <div *ngIf="!userid" class="alert alert-warning" role="alert">
        You are not logged in or your token has expired. Please
        <a routerLink="/login">login</a> first in order to subscribe
      </div>
      <ul class="list-group" *ngIf="!books">
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          No books in library, please check again later ...
        </li>
      </ul>
      <div class="row" *ngIf="books">
        <div class="card col-md-4" *ngFor="let book of books.data">
          <div class="card-body">
            <h4 class="card-title">{{ book.name }}</h4>
            <h6 class="card-subtitle mb-2 price">
              {{ book.price | currency: "ZAR":"symbol-narrow" }}
            </h6>
            <p class="card-text">
              {{ book.text }}
            </p>
            <button
              [disabled]="!userid"
              (click)="subscribe(book.id)"
              class="btn btn-success"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .gap-above {
        margin: 100px auto;
      }

      .price {
        font-weight: 700;
        font-size: 20px;
      }
    `,
  ],
})
export class AllbooksComponent implements OnInit {
  books: any[] = null;
  userid: number = null;

  constructor(
    private booksSvc: BooksService,
    private authSvc: AuthServiceService,
    private jwtHelper: JwtHelperService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.booksSvc.getAllBooks().subscribe(
      (data: any[]) => {
        this.books = data;
      },
      (error) => {
        console.log(error);
      }
    );

    if (this.authSvc.isloggedin()) {
      const token: string = localStorage.getItem("loginToken");
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.userid =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];
    }
  }

  subscribe(bookid: number) {
    this.booksSvc.addBookSubscription(+this.userid, +bookid).subscribe(
      (data: any[]) => {
        this.showSuccess("Book successfully added to subscription.");
      },
      (error) => {
        this.showFailure(error.error.message);
        console.log(error);
      }
    );
  }

  showSuccess(message: string) {
    this.toastr.success(message, "Subscribe");
  }

  showFailure(message: string) {
    this.toastr.error(message, "Subscribe");
  }
}
