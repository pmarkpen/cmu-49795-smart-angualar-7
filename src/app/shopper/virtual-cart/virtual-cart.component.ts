import { Component, OnInit } from '@angular/core';
import { ShopperInformationService } from '../../shopper-information.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-virtual-cart',
  templateUrl: './virtual-cart.component.html',
  styleUrls: ['./virtual-cart.component.scss']
})
export class VirtualCartComponent implements OnInit {

  constructor(private shopperInformationService: ShopperInformationService, private http: HttpClient) { }

  items: GetVirtualCartResponseItem[];
  ngOnInit() {
    this.initializeTheTable();
  }

  fetchVirtualCart(): Observable<GetVirtualCartResponse> {
    return this.http.get(`http://${environment.host}/api/virtual-cart/${this.shopperInformationService.shopperId}`) as Observable<GetVirtualCartResponse>; 
  }

  removeVirtualCart(productName: string): Observable<GetVirtualCartResponse> {
    return this.http.delete(`http://${environment.host}/api/virtual-cart/${this.shopperInformationService.shopperId}/${productName}`) as Observable<GetVirtualCartResponse>; 
  }

  initializeTheTable() {
    this.fetchVirtualCart().subscribe((result: GetVirtualCartResponse) => {
      this.items = result.result.requests;
    });
  }

  removeItem(item: GetVirtualCartResponseItem) {
    this.removeVirtualCart(item.productName).subscribe(() => {
      this.initializeTheTable();
    });
  }
}

interface GetVirtualCartResponse {
  "status": string;
  "result": {
    "requests": GetVirtualCartResponseItem[]
  }
}

interface GetVirtualCartResponseItem {
  "id": string;
  "shopperID": string;
  "productName": string;
  "storeName": string;

}
