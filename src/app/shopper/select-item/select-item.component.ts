import { Component, OnInit } from '@angular/core';
import StoreItem from './model/store-item';
import Product from './model/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.scss']
})
export class SelectItemComponent implements OnInit {

  storeList: StoreItem[];
  productList: Product[];
  constructor(private router: Router) {
    let temp = new StoreItem();
    temp.storeId = 1;
    temp.storeName = "SafeWay";
    temp.storeDescription = "Cupertino";

    this.storeList = [temp, temp, temp, temp, temp, temp, temp, temp, temp, temp, temp, temp, temp, temp, temp, temp, temp, temp, temp, temp, temp, temp, temp, temp, temp, temp, temp, temp];

    let productTemp = new Product();
    productTemp.name = "SET 2 TEA TOWELS";
    this.productList = [productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp];
  }

  fetchStores() {

  }

  fetchProducts(storeId: number) {

  }

  ngOnInit() {
  }

  onClickProduct(product: Product) {
    this.router.navigateByUrl('shopper/association-result');
  }
}
