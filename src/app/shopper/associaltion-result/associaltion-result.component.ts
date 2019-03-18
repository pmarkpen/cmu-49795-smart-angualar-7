import { Component, OnInit } from '@angular/core';
import AssociatedProductItem from './model/associated-product-item';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-associaltion-result',
  templateUrl: './associaltion-result.component.html',
  styleUrls: ['./associaltion-result.component.scss']
})
export class AssocialtionResultComponent implements OnInit {
  productId: string;
  storeId: string;
  productList:AssociatedProductItem[];
  constructor(private route: ActivatedRoute) { 
    let temp = new AssociatedProductItem();
    temp.name = "Egg";
    temp.support = 80;

    this.productList = [temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp,temp];
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get("productId");
    this.storeId = this.route.snapshot.paramMap.get("storeId");
  }

}
