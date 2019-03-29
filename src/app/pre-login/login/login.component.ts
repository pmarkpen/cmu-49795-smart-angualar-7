import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopperInformationService } from '../../shopper-information.service';
import { StoreInformationService } from '../../store-information.service';

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
    private storeInformationService: StoreInformationService) {

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

    if (this.isStore) {
      this.storeInformationService.storeId = this.id;
      this.storeInformationService.storeName = this.id;
      this.shopperInformationService.isShopper = true;
    } else {
      this.shopperInformationService.firstName = this.id;
      this.shopperInformationService.isShopper = true;
    }

    this.router.navigateByUrl("/after-login/home")
  }



}
