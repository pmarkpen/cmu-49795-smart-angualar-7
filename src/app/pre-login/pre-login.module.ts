import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreLoginComponent } from './pre-login.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { SignUpShopperComponent } from './sign-up-shopper/sign-up-shopper.component';
import { LoginService } from './login/login.service';

const appRoutes: Routes = [{
  path: '', component: PreLoginComponent, children: [
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'sign-up-shopper', component: SignUpShopperComponent }
  ]
}];

@NgModule({
  declarations: [PreLoginComponent, LoginComponent, SignUpComponent, SignUpShopperComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(
      appRoutes
    ),
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [LoginService]
})
export class PreLoginModule { }
