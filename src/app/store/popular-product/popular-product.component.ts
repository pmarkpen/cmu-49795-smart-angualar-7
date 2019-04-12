import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Product from '../../shopper/select-item/model/product';
import FetchProductResponse from '../../shopper/select-item/model/fetch-product-response';
import { environment } from '../../../environments/environment';
import { StoreInformationService } from '../../store-information.service';
import Chart from 'chart.js';

@Component({
  selector: 'app-popular-product',
  templateUrl: './popular-product.component.html',
  styleUrls: ['./popular-product.component.scss']
})
export class PopularProductComponent implements OnInit {
  productList = [];
  filterValue: string;
  @ViewChild('myChart') myChart;
  @ViewChild('myDatepicker') fromDatepicker;
  @ViewChild('toDatepicker') toDatepicker;

  constructor(private http: HttpClient, private storeInformationService: StoreInformationService) { }

  ngOnInit() {
    this.fetchProducts(this.storeInformationService.storeId);
    this.drawChart();
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

  doFilter(value: string) {
    this.filterValue = value;
  }


  drawChart() {
    let data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'My First dataset',
        data: [0, 1, 2, 3, 4, 5, 6]
      }]
    };

    var myLineChart = new Chart(this.myChart.nativeElement, {
      type: 'line',
      data: data,
      options: {
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 100
            }
        }
      }
    });
  }

}
