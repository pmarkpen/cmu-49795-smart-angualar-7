import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopperInformationService } from '../../shopper-information.service';
import { StoreInformationService } from '../../store-information.service';
import { AuthGuardService } from '../../auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isStore: boolean;
  id: string;
  password: string;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private shopperInformationService: ShopperInformationService,
    private storeInformationService: StoreInformationService,
  private authGuardService: AuthGuardService) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const paramUrl = this.router.parseUrl(this.router.url);
      this.isStore = paramUrl.queryParams.store === undefined ? false : true;
    });
  }

  get idDescription(): string {
    return this.isStore ? 'StoreId' : 'UserId';
  }

  onClickLogin() {
    if (this.id === "" || this.id === undefined) {
      alert("Please insert id");
      return
    }

    if (this.password === "" || this.password === undefined) {
      alert("Please insert password");
      return
    }

    sessionStorage.clear();

    if (this.isStore) {
      this.storeInformationService.setInformation(true, this.id, this.id);
      this.shopperInformationService.update();
    } else {
      this.shopperInformationService.setInformation(true, this.id, this.id, this.id);
      this.storeInformationService.update();
    }

    this.authGuardService.setLogIn();
    this.router.navigateByUrl("/after-login/home")
  }



}
