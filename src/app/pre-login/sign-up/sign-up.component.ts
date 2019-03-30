import { Component, OnInit } from '@angular/core';
import {MatFormFieldControl} from '@angular/material';

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
  constructor() { }

  ngOnInit() {
  }

  onClickSignUp() {
    if(this.isEmpty(this.storeId)){
      alert("Store Id is required");
      return;
    }
    if(this.isEmpty(this.password)){
      alert("Password is required");
      return;
    }
    if(this.isEmpty(this.confirmedPassword)){
      alert("Confirm Password is required");
      return;
    }
    if(this.password !== this.confirmedPassword){
      alert("Password and Confirm Password must be the same");
      return;
    }
    if(this.isEmpty(this.storeName)){
      alert("Store Name is required");
      return;
    }
    if(this.isEmpty(this.storeDescription)){
      alert("Store Description is required");
      return;
    }
  }

  isEmpty(value: string) {
    return value === undefined || value === "";
  }

  

}
