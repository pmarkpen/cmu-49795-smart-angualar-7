import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import StoreItem from './model/store-item';
import Product from './model/product';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import FetchStoreResponse from './model/fetch-store-response';
import FetchProductResponse from './model/fetch-product-response';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-select-item',
  templateUrl: './select-item.component.html',
  styleUrls: ['./select-item.component.scss']
})
export class SelectItemComponent implements OnInit {

  @ViewChild('selectItemScroll') private selectItemScrollContainer: ElementRef;
  numberOfShowingItem: number = 10;
  storeList: StoreItem[];
  productList: Product[];
  selectedStore: StoreItem;
  filterValue: string;
  constructor(private router: Router, private http: HttpClient) {
    this.storeList = [];
    this.productList = [];
  }

  fetchStores() {
    this.http.get(`http://${environment.host}/api/stores`).subscribe((response: FetchStoreResponse) => {
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
    this.http.get(`http://${environment.host}/api/stores/${storeId}`).subscribe((response: FetchProductResponse) => {
      if (response.result.requests.length >= 1) {
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
    this.router.navigateByUrl(`/after-login/shopper/association-result/${this.selectedStore.id}/${product.name}`);
  }

  onClickStore(store: StoreItem) {
    this.selectedStore = store;
    this.fetchProducts(store.id);
    this.numberOfShowingItem = 10;
  }

  isStoreClicked(storeItem: StoreItem) {
    if (this.selectedStore === undefined) {
      return false;
    }
    return this.selectedStore.id === storeItem.id;
  }

  doFilter(value: string) {
    this.filterValue = value;
    this.numberOfShowingItem = 10;
    let element = this.selectItemScrollContainer.nativeElement;
    element.scrollTo(0, 0);
  }

  onScroll() {
    let element = this.selectItemScrollContainer.nativeElement
    let atBottom = element.scrollHeight - element.scrollTop === element.clientHeight
    if (atBottom) {
      this.numberOfShowingItem += 10;
    }
  }
}
