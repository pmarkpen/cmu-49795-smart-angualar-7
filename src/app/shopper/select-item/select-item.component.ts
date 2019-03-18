import { Component, OnInit } from '@angular/core';
import StoreItem from './model/store-item';
import Product from './model/product';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import FetchStoreResponse from './model/fetch-store-response';
import FetchProductResponse from './model/fetch-product-response';

@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.scss']
})
export class SelectItemComponent implements OnInit {

  storeList: StoreItem[];
  productList: Product[];
  selectedStore: StoreItem;
  constructor(private router: Router, private http: HttpClient) {
    this.storeList = [];
    this.productList = [];
  }

  fetchStores() {
    this.http.get(`http://localhost:3000/api/stores`).subscribe((response: FetchStoreResponse) => {
      response.result.requests.forEach((s) => {
        let store = new StoreItem();
        store.id = s.storeID;
        store.name = s.storeName;
        store.description = s.storeDescription;
        this.storeList.push(store);
      });
    });
  }

  fetchProducts(storeId: string) {
    this.productList = [];
    this.http.get(`http://localhost:3000/api/stores/${storeId}`).subscribe((response: FetchProductResponse) => {
      if(response.result.requests.length >= 1) {
        response.result.requests[0].products.sort();
        response.result.requests[0].products.forEach((uniqueProductName) => {
          let pItem = new Product();
          pItem.name = uniqueProductName;
          this.productList.push(pItem);
        });
      }
    });
  }

  ngOnInit() {
    this.fetchStores();
  }

  onClickProduct(product: Product) {
    this.router.navigateByUrl(`shopper/association-result/${this.selectedStore.id}/${product.name}`);
  }

  onClickStore(store: StoreItem) {
    this.selectedStore = store;
    this.fetchProducts(store.id);
  }

  isStoreClicked(storeItem: StoreItem) {
    if(this.selectedStore === undefined) {
      return false;
    }
    return this.selectedStore.id === storeItem.id;
  }
}
