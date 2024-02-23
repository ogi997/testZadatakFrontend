import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FaktureComponent } from './fakture/fakture.component';
import { OpenFakturaComponent } from './components/open-faktura/open-faktura.component';
import { GuardService } from './services/guard/guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path:'fakture',
    component: FaktureComponent,
    canActivate: [GuardService]
  },
  {
    path: 'faktura/:id',
    component: OpenFakturaComponent,
    canActivate: [GuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
