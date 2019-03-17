import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { StoreAssociationFetcherService } from '../store-association-fetcher.service';
import { HttpClient } from '@angular/common/http'
import { Article } from '../model/article';

@Component({
  selector: 'app-store-association-result',
  templateUrl: './store-association-result.component.html',
  styleUrls: ['./store-association-result.component.scss']
})
export class StoreAssociationResultComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private storeAssociationFetcherService: StoreAssociationFetcherService, private httpClient: HttpClient) { }

  displayedColumns: string[] = ['name', 'associatedItems', 'levelOfConfidence'];
  dataSource = new MatTableDataSource([]);

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.fetchResult();
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public fetchResult() {

    this.httpClient.get('http://localhost:3000/api/association/sample/').subscribe((response: FetchStoreAssociationResponse) => {
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
