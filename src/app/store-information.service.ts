import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreInformationService {

  isStore: boolean;
  storeId: string;
  storeName: string;
  constructor() { 
    this.isStore = false;
  }

}
