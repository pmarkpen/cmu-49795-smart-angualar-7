import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopperInformationService {

  isShopper: boolean;
  shopperId: string;
  firstName: string;
  lastName: string;
  constructor() {
    this.isShopper = false;
    this.update();
  }

  update() {
    let sessionInformation = JSON.parse(sessionStorage.getItem("storeInformation")) || {};
    this.isShopper = sessionInformation.isShopper || false;
    this.shopperId = sessionInformation.shopperId || "";
    this.firstName = sessionInformation.firstName || "";
    this.lastName = sessionInformation.lastName || "";
  }

  setInformation(isShopper: boolean, shopperId: string, firstName: string, lastName: string) {
    this.isShopper = isShopper;
    this.shopperId = shopperId;
    this.firstName = firstName;
    this.lastName = lastName;
    sessionStorage.setItem("storeInformation", JSON.stringify({
      isShopper: true,
      shopperId: shopperId,
      firstName: firstName,
      lastName: lastName
    }));
  }
}
