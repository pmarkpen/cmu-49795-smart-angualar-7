import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreLoginComponent } from './pre-login.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [{
  path: '', component: PreLoginComponent, children: [
    { path: 'login', component: LoginComponent }
  ]
}];

@NgModule({
  declarations: [PreLoginComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(
      appRoutes
    )
  ]
})
export class PreLoginModule { }
