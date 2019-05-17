import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopperInformationService } from '../../shared-service/shopper-information.service';
import { StoreInformationService } from '../../shared-service/store-information.service';
import { AuthGuardService } from '../../shared-service/auth-guard.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  isStore: boolean;
  isLoginClicked: boolean;
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
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.loginForm.patchValue({ "email": "" });
  }

  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }

  get idDescription(): string {
    return this.isStore ? 'StoreId' : 'UserId';
  }

  onClickLogin() {
    this.isLoginClicked = true;
    if (!this.loginForm.valid) { return; }

    this.storeInformationService.testIdentity = "eiei";

    sessionStorage.clear();

    if (this.isStore) {
      this.http.post(`http://${environment.host}/signin-store`, {
        storeID: this.loginForm.value["email"],
        password: this.loginForm.value["password"]
      }).subscribe((response: LogInStoreResponse) => {
        this.storeInformationService.setInformation(true, response.result.storeID, response.result.storeName);
        this.shopperInformationService.update();
        this.authGuardService.setLogIn();
        this.router.navigateByUrl("/after-login/home");
      }, (err) => {
        if (err.error.errors != undefined) {
          alert(err.error.errors.reduce((previousValue, currentValue) => {
            return `${previousValue}, ${currentValue}`
          }));
        }
      });
    } else {
      this.http.post(`http://${environment.host}/signin-shopper`, {
        shopperID: this.loginForm.value["email"],
        password: this.loginForm.value["password"]
      }).subscribe((response: LogInShopperResponse) => {
        this.shopperInformationService.setInformation(true, response.result.shopperID, response.result.firstName, response.result.lastName);
        this.storeInformationService.update();
        this.authGuardService.setLogIn();
        this.router.navigateByUrl("/after-login/home");
      }, (err) => {
        if (err.error.errors != undefined) {
          alert(err.error.errors.reduce((previousValue, currentValue) => {
            return `${previousValue}, ${currentValue}`
          }));
        }
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
