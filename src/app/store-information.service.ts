import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreInformationService {

  storeId: string;
  storeName: string;
  constructor() { 
    this.storeId = "sample";
    this.storeName = "Sample";
  }

}
