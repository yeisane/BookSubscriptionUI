import { Component, OnDestroy, OnInit } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { AuthServiceService } from "src/app/services/auth-service.service";
import { BooksService } from "src/app/services/books.service";

@Component({
  selector: "app-mybooks",
  template: `
    <div class="gap-above container">
      <ul class="list-group">
        <li
          class="list-group-item d-flex justify-content-between align-items-center"
          *ngFor="let book of user?.books"
        >
          {{ book.name }}

          <button (click)="unsubscribe(book.id)" class="btn btn-danger">
            Unsubscribe
          </button>
        </li>

        <li
          class="list-group-item d-flex justify-content-between align-items-center"
          *ngIf="user?.books.length <= 0"
        >
          No books subscribed to...

          <a routerLink="/allbooks" class="btn btn-info">Browse collection</a>
        </li>
      </ul>
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
export class MybooksComponent implements OnInit, OnDestroy {
  user: any;
  userid: number;
  sub: Subscription;

  constructor(
    private jwtHelper: JwtHelperService,
    private authSvc: AuthServiceService,
    private bookSvc: BooksService,
    private toastr: ToastrService
  ) {}

  getBooks() {
    const token: string = localStorage.getItem("loginToken");
    const decodedToken = this.jwtHelper.decodeToken(token);
    const id =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];

    this.bookSvc.getUserBooks(id).subscribe(
      (resp) => {
        this.user = resp;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  unsubscribe(bookid: number) {
    this.sub = this.bookSvc
      .removeBookSubscription(+this.userid, +bookid)
      .subscribe(
        (data: any) => {
          this.showSuccess("Book successfully removed from subscription.");
          this.user.books = this.user.books.filter((b) => b.id != bookid);
        },
        (error) => {
          console.log(error);
          this.showFailure(error);
        }
      );
  }
  ngOnInit(): void {
    this.getBooks();

    if (this.authSvc.isloggedin()) {
      const token: string = localStorage.getItem("loginToken");
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.userid =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];
    }
  }

  showSuccess(message: string) {
    this.toastr.success(message, "Subscribe");
  }

  showFailure(message: string) {
    this.toastr.error(message, "Subscribe");
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
