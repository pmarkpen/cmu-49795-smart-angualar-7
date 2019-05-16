import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { HttpClient } from '@angular/common/http'
import { Article } from '../model/article';
import { StoreInformationService } from '../../shared-service/store-information.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-store-association-result',
  templateUrl: './store-association-result.component.html',
  styleUrls: ['./store-association-result.component.scss']
})
export class StoreAssociationResultComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  storeName: string;
  constructor(private httpClient: HttpClient, private storeInformationService: StoreInformationService) { }

  displayedColumns: string[] = ['name', 'associatedItems', 'levelOfConfidence'];
  dataSource = new MatTableDataSource([]);

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.fetchResult();
    this.storeName = this.storeInformationService.storeName;
    this.dataSource.filterPredicate = function(data: Article, filter: string): boolean {
      return data.itemName.toLowerCase().includes(filter);
    };
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public fetchResult() {

    this.httpClient.get(`http://${environment.host}/api/association/${this.storeInformationService.storeId}/`).subscribe((response: FetchStoreAssociationResponse) => {
      let result: Article[] = [];
      response.result.requests.forEach(element => {
        if (element.length > 1) {
          element.itemsets.forEach((productName: string) => {
            let item: Article = new Article();
            item.itemName = productName;
            let associatedItems = "";
            element.itemsets.forEach((pName, index) => {
              if(pName != productName) {
                if(associatedItems === "") {
                  associatedItems = `${pName}`;
                } else {
                  associatedItems = `${associatedItems}, ${pName}`;
                }
              }
            });
            item.associatedItemNames = associatedItems;
            item.levelOfConfidence = element.support;
            result.push(item);
          });
        }
      });
      this.dataSource.data = result;
    });

  }

}

interface FetchStoreAssociationResponse {
  status: string;
  result: {
    requests: FetchStoreAssociationResponseItem[];
  }
}

interface FetchStoreAssociationResponseItem {
  support: number;
  itemsets: string[];
  storeID: string;
  length: number;
}
