import { Component, OnInit } from '@angular/core';
import AssociatedProductItem from './model/associated-product-item';

@Component({
  selector: 'app-associaltion-result',
  templateUrl: './associaltion-result.component.html',
  styleUrls: ['./associaltion-result.component.scss']
})
export class AssocialtionResultComponent implements OnInit {
  productList:AssociatedProductItem[];
  constructor() { 
    let temp = new AssociatedProductItem();
    temp.name = "Egg";
    temp.support = 80;

    this.productList = [temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp];
  }

  ngOnInit() {
  }

}
