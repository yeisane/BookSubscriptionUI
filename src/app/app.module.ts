import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { JwtModule } from "@auth0/angular-jwt";
import { ToastNoAnimationModule } from "ngx-toastr";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/register/register.component";
import { ResellerComponent } from "./components/reseller/reseller.component";
import { AllbooksComponent } from "./components/allbooks/allbooks.component";
import { MybooksComponent } from "./components/mybooks/mybooks.component";
import { AuthServiceService } from "./services/auth-service.service";
import { getToken } from "./helpers/tokenget";
import { BooksService } from "./services/books.service";
import { UsersService } from "./services/users.service";
import { ApiKeyInterceptor } from "./helpers/apikey.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ResellerComponent,
    AllbooksComponent,
    MybooksComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastNoAnimationModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: ["localhost:5001"],
        blacklistedRoutes: [],
      },
    }),
  ],
  providers: [
    AuthServiceService,
    BooksService,
    UsersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiKeyInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
