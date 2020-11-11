import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AllbooksComponent } from "./components/allbooks/allbooks.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { MybooksComponent } from "./components/mybooks/mybooks.component";
import { RegisterComponent } from "./components/register/register.component";
import { ResellerComponent } from "./components/reseller/reseller.component";
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "reseller",
    component: ResellerComponent,
  },
  {
    path: "allbooks",
    component: AllbooksComponent,
  },
  {
    path: "mybooks",
    component: MybooksComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
