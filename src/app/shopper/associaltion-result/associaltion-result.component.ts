import { Component, OnInit, ViewChild } from '@angular/core';
import AssociatedProductItem from './model/associated-product-item';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import AssociatedProductItemResponse from './model/associated-product-item-response';
import { ShopperInformationService } from '../../shared-service/shopper-information.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-associaltion-result',
  templateUrl: './associaltion-result.component.html',
  styleUrls: ['./associaltion-result.component.scss']
})
export class AssocialtionResultComponent implements OnInit {
  @ViewChild("products") products: any;
  productId: string;
  storeId: string;
  storeName: string;
  productList: AssociatedProductItem[];
  constructor(private route: ActivatedRoute, private http: HttpClient, private shopperInformationService: ShopperInformationService) {
    this.productList = [];

  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get("productId");
    this.storeId = this.route.snapshot.paramMap.get("storeId");
    this.fetchStoreInformation();
    this.fetchAssociationResult();
  }

  fetchAssociationResult() {
    this.http.get(`http://${environment.host}/api/association/${this.storeId}/${this.productId}`).subscribe((response: AssociatedProductItemResponse) => {
      response.result.requests.forEach((item) => {
        let product: AssociatedProductItem = new AssociatedProductItem();
        product.name = "";

        item.itemsets.forEach((pName) => {
          if (pName != this.productId) {
            if (product.name == "") {
              product.name = pName;
              return;
            }

            product.name = `${product.name}, ${pName}`;
          }
        });
        product.support = item.support;
        this.productList.push(product);
      });
    });
  }

  fetchStoreInformation() {
    this.http.get(`http://${environment.host}/api/store-info/${this.storeId}`).subscribe((response: StoreInformationResponse) => {
      this.storeName = response.result.requests.storeName;
    });
  }
  async addItemsToCart() {
    let selectedOptions = this.products.selectedOptions.selected.map(item => item.value);
    for (let i = 0; i < selectedOptions.length; i++) {
      const result = await this.saveVirtualCartItem(selectedOptions[i]);
      this.productList = this.productList.filter((item) => {
        return item.name != selectedOptions[i];
      });
    };

    alert("Items were added successfully!");

    
  }

  saveVirtualCartItem(productName: string) {
    this.http.post(`http://${environment.host}/api/virtual-cart/${this.shopperInformationService.shopperId}`, {
      item: {
        productName: productName,
        storeName: this.storeName,
        buyWithProductName: this.productId
      }
    }).subscribe((response: any) => {
      return;
    }, (err) => {
      alert(`Cannot add ${productName}, ${err.error.errors[0]}`)
    });
  }

}

interface StoreInformationResponse {
  "status": string,
  "result": {
    "requests": {
      "id": string,
      "storeID": string,
      "storeName": string,
      "storeDescription": string
    }
  }
}
