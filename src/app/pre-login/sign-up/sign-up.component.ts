import { Component, OnInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  storeId: string;
  password: string;
  confirmedPassword: string;
  storeName: string;
  storeDescription: string;
  constructor(private http: HttpClient, private route: Router) { }

  ngOnInit() {
  }

  onClickSignUp() {
    if (this.isEmpty(this.storeId)) {
      alert("Store Id is required");
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
    if (this.isEmpty(this.storeName)) {
      alert("Store Name is required");
      return;
    }
    if (this.isEmpty(this.storeDescription)) {
      alert("Store Description is required");
      return;
    }

    this.http.post(`http://localhost:3000/signup-store`, {
      storeID: this.storeId,
      password: this.password,
      name: this.storeName,
      description: this.storeDescription
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
    this.route.navigateByUrl("/pre-login/login?store=")
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