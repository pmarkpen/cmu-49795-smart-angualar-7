import { Component, OnInit } from '@angular/core';
import StoreItem from './pick-store/model/store-item';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.scss']
})
export class SelectItemComponent implements OnInit {
  
  storeList: StoreItem[];

  constructor() {
    let temp = new StoreItem();
    temp.storeName = "SafeWay";
    temp.storeDescription = "Cupertino";

    this.storeList = [temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp, temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp];
   }

  ngOnInit() {
  }

}
