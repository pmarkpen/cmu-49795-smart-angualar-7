import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { StoreAssociationFetcherService } from '../store-association-fetcher.service';

@Component({
  selector: 'app-store-association-result',
  templateUrl: './store-association-result.component.html',
  styleUrls: ['./store-association-result.component.scss']
})
export class StoreAssociationResultComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private storeAssociationFetcherService: StoreAssociationFetcherService) { }

  displayedColumns: string[] = ['name', 'associatedItems', 'levelOfConfidence'];
  dataSource = new MatTableDataSource(this.storeAssociationFetcherService.getAllArticles());

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
