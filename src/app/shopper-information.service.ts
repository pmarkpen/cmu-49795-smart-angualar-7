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
   }
}
