import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CanActivateChild } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ShopperInformationService } from './shopper-information.service';
import { StoreInformationService } from './store-information.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  isLoggedIn: boolean;
  path: string;
  constructor(private shopperInformationService: ShopperInformationService,
    private storeInformationService: StoreInformationService,
    private router: Router) {
    this.isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true" ? true : false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.isLoggedIn) { return of(false); }

    if (state.url.startsWith("/after-login/shopper") && !this.shopperInformationService.isShopper) {
      this.router.navigate(['/after-login/home']);
    }

    if (state.url.startsWith("/after-login/store") && !this.storeInformationService.isStore) {
      this.router.navigate(['/after-login/home']);
    }

    return of(true);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return of(this.isLoggedIn);
  }

  setLogIn() {
    this.isLoggedIn = true;
    sessionStorage.setItem("isLoggedIn", "true");
  }
}
