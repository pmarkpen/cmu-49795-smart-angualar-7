import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-shopper',
  templateUrl: './sign-up-shopper.component.html',
  styleUrls: ['./sign-up-shopper.component.scss']
})
export class SignUpShopperComponent implements OnInit {

  shopperId: string;
  password: string;
  confirmedPassword: string;
  firstName: string;
  lastName: string;
  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit() {
  }

  onClickSignUp() {
    if (this.isEmpty(this.shopperId)) {
      alert("Shopper Id is required");
      return;
    }
    if (this.isEmpty(this.password)) {
      alert("Password is required");
      return;
    }
    if (this.isEmpty(this.confirmedPassword)) {
      alert("Confirm Password is required");
      return;
    }
    if (this.password !== this.confirmedPassword) {
      alert("Password and Confirm Password must be the same");
      return;
    }
    if (this.isEmpty(this.firstName)) {
      alert("First Name is required");
      return;
    }
    if (this.isEmpty(this.lastName)) {
      alert("Last Name is required");
      return;
    }

    this.http.post(`http://localhost:3000/signup-shopper`, {
      shopperID: this.shopperId,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName
    }).subscribe((response: SignUpStoreResponse) => {
      alert("Sign Up succesfully");
      this.route.navigateByUrl("/");
    }, (err) => {
      alert(err.error.errors.reduce((previousValue, currentValue) => {
        return `${previousValue}, ${currentValue}`
      }));
    });

  }

  isEmpty(value: string) {
    return value === undefined || value === "";
  }

  onClickCancel() {
    this.route.navigateByUrl("/pre-login/login")
  }


}


interface SignUpStoreResponse {
  "status": string,
  "result": {
    "addedStore": {
      "storeID": string,
      "name": string,
      "description": string
    }
  },
  "errors": string[]
}