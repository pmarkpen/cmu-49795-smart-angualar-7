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
    let productTemp = new Product();
    productTemp.name = "JUMBO BAG RED RETROSPOT";
    this.productList = [productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp, productTemp];
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

  fetchProducts(storeId: number) {
    this.http.get('').subscribe((response: FetchProductResponse) => {

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
  }

  isStoreClicked(storeItem: StoreItem) {
    if(this.selectedStore === undefined) {
      return false;
    }
    return this.selectedStore.id === storeItem.id;
  }
}
