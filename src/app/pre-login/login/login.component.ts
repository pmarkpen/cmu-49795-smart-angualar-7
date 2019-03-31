import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopperInformationService } from '../../shopper-information.service';
import { StoreInformationService } from '../../store-information.service';
import { AuthGuardService } from '../../auth-guard.service';
import { HttpClient } from '@angular/common/http';

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
    private authGuardService: AuthGuardService,
    private http: HttpClient) {

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
      this.http.post(`http://localhost:3000/signin-store`, {
        storeID: this.id,
        password: this.password
      }).subscribe((response: LogInStoreResponse) => {
        this.storeInformationService.setInformation(true, response.result.storeID, response.result.storeName);
        this.shopperInformationService.update();
        this.authGuardService.setLogIn();
        this.router.navigateByUrl("/after-login/home");
      }, (err) => {
        alert(err.error.errors.reduce((previousValue, currentValue) => {
          return `${previousValue}, ${currentValue}`
        }));
      });
    } else {
      this.http.post(`http://localhost:3000/signin-shopper`, {
        shopperID: this.id,
        password: this.password
      }).subscribe((response: LogInShopperResponse) => {
        this.shopperInformationService.setInformation(true, response.result.shopperID, response.result.firstName, response.result.lastName);
        this.storeInformationService.update();
        this.authGuardService.setLogIn();
        this.router.navigateByUrl("/after-login/home");
      }, (err) => {
        alert(err.error.errors.reduce((previousValue, currentValue) => {
          return `${previousValue}, ${currentValue}`
        }));
      });
    }
  }


  get mode() {
    return this.isStore ? "Store" : "Shopper"
  }

  get oppositeMode() {
    return this.isStore ? "Shopper" : "Store"
  }

  getOppositeURL() {
    return `/pre-login/login?${this.isStore ? "shopper" : "store"}`;
  }
}

interface LogInStoreResponse {
  "status": string,
  "result": {
    "id": string,
    "storeID": string,
    "storeName": string,
    "storeDescription": string
  }
}

interface LogInShopperResponse {
  "status": string,
  "result": {
    "id": string,
    "shopperID": string,
    "firstName": string,
    "lastName": string
  }
}
