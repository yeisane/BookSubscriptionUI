import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getUserBooks(id: number) {
    return this.http.get(`http://localhost:5001/api/UserBooks/${id}`, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  addBookSubscription(userid: number, bookid: number) {
    const bookObj = { userid, bookid };
    return this.http.post(`${environment.BaseUrl}/api/UserBooks`, bookObj, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  removeBookSubscription(userid: number, bookid: number) {
    const options = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      body: {
        userid,
        bookid,
      },
    };

    const bookObj: any = { userid, bookid };
    return this.http.delete(`${environment.BaseUrl}/api/UserBooks`, options);
  }

  //Please note that the paging values are hard coded. They can easily be passed as params and the API support that already
  getAllBooks() {
    return this.http.get(
      `${environment.BaseUrl}/api/books?pageIndex=1&pageSize=15`,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      }
    );
  }
}
