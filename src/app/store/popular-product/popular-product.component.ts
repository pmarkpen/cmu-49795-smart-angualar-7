import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Product from '../../shopper/select-item/model/product';
import FetchProductResponse from '../../shopper/select-item/model/fetch-product-response';
import { environment } from '../../../environments/environment';
import { StoreInformationService } from '../../store-information.service';
import Chart from 'chart.js';
import { Observable } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-popular-product',
  templateUrl: './popular-product.component.html',
  styleUrls: ['./popular-product.component.scss']
})
export class PopularProductComponent implements OnInit {
  productList: Product[] = [];
  filterValue: string;
  fromDate: any = new Date(2000, 0, 1);
  toDate: any = new Date(2020, 0, 1);
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 0, 1);
  selectedProduct: Product;
  myLineChart;

  @ViewChild('myChart') myChart;
  @ViewChild('myDatepicker') fromDatepicker;
  @ViewChild('toDatepicker') toDatepicker;

  constructor(private http: HttpClient, private storeInformationService: StoreInformationService) { }

  ngOnInit() {
    this.fetchProducts(this.storeInformationService.storeId);
    this.fetchMinMaxDate(this.storeInformationService.storeId);
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

  fetchMinMaxDate(storeId: string) {
    this.http.get(`http://${environment.host}/api/store-info/${storeId}?getMinMax=true`).subscribe((response: MinMaxInvoiceDateResponse) => {
      this.minDate = new Date(response.result.requests.minDate);
      this.maxDate = new Date(response.result.requests.maxDate);
      this.fromDate = new Date(response.result.requests.minDate);
      this.toDate = new Date(response.result.requests.maxDate);
    });
  }

  fetchChartData(storeId: string, productId: String, fromDate: string, toDate: string) {
    return this.http.get(`http://${environment.host}/api/store-info/${storeId}/${productId}?fromDate=${fromDate}&toDate=${toDate}`) as Observable<ProductTrendsResponse>;
  }

  doFilter(value: string) {
    this.filterValue = value;
  }

  getFormattedDate(date: Date) {
    return `${date.getMonth()+1}/${date.getDay()}/${date.getFullYear()}`;
  }

  drawChart() {
    if(this.myLineChart) {
      this.myLineChart.destroy();
    }

    let fromDate = this.fromDate instanceof Date ? this.getFormattedDate(this.fromDate) : this.fromDate.format('MM/DD/YYYY');
    let toDate = this.toDate instanceof Date ? this.getFormattedDate(this.toDate) : this.toDate.format('MM/DD/YYYY');
    this.fetchChartData(this.storeInformationService.storeId, this.selectedProduct.name, fromDate, toDate).subscribe((result) => {
        let labels = [];
        let date = [];

        result.result.requests.result.forEach((item) => {
          labels.push(item.date);
          date.push(item.quantity);
        });

        let data = {
          labels: labels,
          datasets: [{
            label: `${this.selectedProduct.name} from ${fromDate} to ${toDate} dataset`,
            data: date,
            backgroundColor: [
              "#f38b4a"
            ]
          }]
        };
    
        this.myLineChart = new Chart(this.myChart.nativeElement, {
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
            },
            spanGaps: false
          }
        });
    });
  }

  onSelectProduct(product: Product) {
    this.selectedProduct = product;
    this.drawChart();
  }

  isProductClicked(product: Product) {
    return product === this.selectedProduct;
  }

  onChange($event) {
    this.drawChart();
  }

  reset() {
    this.fromDate = this.minDate;
    this.toDate = this.maxDate;
    this.drawChart();
  }

}


interface MinMaxInvoiceDateResponse {
  "status": string,
  "result": {
    "requests": {
      "minDate": number,
      "maxDate": number
    }
  }
}

interface ProductTrendsResponse {
  "status": string,
  "result": {
    "requests": {
      "result": ProductTrendsResponseItem[]
    }
  }
}

interface ProductTrendsResponseItem {
  "date": string,
  "quantity": number
}