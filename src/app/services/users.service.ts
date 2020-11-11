import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private http: HttpClient) {}

  registerUser(user) {
    return this.http.post(`${environment.BaseUrl}/api/users`, user, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  registerApiUser(apiuser) {
    return this.http.post(`${environment.BaseUrl}/api/apiusers`, apiuser, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }
}
