import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pick-store-item',
  templateUrl: './pick-store-item.component.html',
  styleUrls: ['./pick-store-item.component.scss']
})
export class PickStoreItemComponent implements OnInit {
  @Input() storeName:String;
  @Input() storeDescription:String;
  
  constructor() { }

  ngOnInit() {
  }

}
