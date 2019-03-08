import { Injectable } from '@angular/core';
import { Article } from './model/article';

const All_ARTICLES: Article[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Soldium', weight: 1.0079, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 4.0026, symbol: 'Mg'},
  {position: 13, name: 'Aluminium', weight: 6.941, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 9.0122, symbol: 'Si'},
  {position: 15, name: 'Phosphorous', weight: 10.811, symbol: 'P'},
];

@Injectable({
  providedIn: 'root'
})
export class StoreAssociationFetcherService {

  constructor() { }
  getAllArticles() {
    return All_ARTICLES;
}
}
