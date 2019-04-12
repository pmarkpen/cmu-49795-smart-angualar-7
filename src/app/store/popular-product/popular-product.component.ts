import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Product from '../../shopper/select-item/model/product';
import FetchProductResponse from '../../shopper/select-item/model/fetch-product-response';
import {environment} from '../../../environments/environment';
import { StoreInformationService } from '../../store-information.service';

@Component({
  selector: 'app-popular-product',
  templateUrl: './popular-product.component.html',
  styleUrls: ['./popular-product.component.scss']
})
export class PopularProductComponent implements OnInit {
  productList = [];
  filterValue: string;
  constructor(private http: HttpClient, private storeInformationService: StoreInformationService) { }

  ngOnInit() {
    this.fetchProducts(this.storeInformationService.storeId);
  }

  fetchProducts(storeId: string) {
    this.productList = [];
    this.http.get(`http://${environment.host}/api/stores/${storeId}`).subscribe((response: FetchProductResponse) => {
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

  doFilter(value: string) {
    this.filterValue = value;
  }


}
