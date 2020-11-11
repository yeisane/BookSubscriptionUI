import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthServiceService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(loginCredentials: { email: string; password: string }) {
    return this.http.post(`${environment.BaseUrl}/api/auth`, loginCredentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  isloggedin(): boolean {
    const token: string = localStorage.getItem("loginToken");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return true;
    }
    return false;
  }
}
