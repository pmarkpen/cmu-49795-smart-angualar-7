import { Component, OnInit } from '@angular/core';
import AssociatedProductItem from './model/associated-product-item';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import AssociatedProductItemResponse from './model/associated-product-item-response';

@Component({
  selector: 'app-associaltion-result',
  templateUrl: './associaltion-result.component.html',
  styleUrls: ['./associaltion-result.component.scss']
})
export class AssocialtionResultComponent implements OnInit {
  productId: string;
  storeId: string;
  productList: AssociatedProductItem[];
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.productList = [];
    
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get("productId");
    this.storeId = this.route.snapshot.paramMap.get("storeId");
    this.fetchAssociationResult();
  }

  fetchAssociationResult() {
    this.http.get(`http://localhost:3000/api/association/${this.storeId}/${this.productId}`).subscribe((response: AssociatedProductItemResponse) => {
      response.result.requests.forEach((item) => {
        let product: AssociatedProductItem = new AssociatedProductItem();
        product.name = item.itemsets.reduce((p, c) => {
          return `${p}, ${c}`;
        });
        product.support = item.support;
        this.productList.push(product);
      });
    });
  }

}
