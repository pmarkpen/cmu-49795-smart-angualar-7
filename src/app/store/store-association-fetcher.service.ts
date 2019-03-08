import { Injectable } from '@angular/core';
import { Article } from './model/article';

const All_ARTICLES: Article[] = [
  {itemName: 'Hydrogen', levelOfConfidence: 1.0079, associatedItemNames: 'H'},
  {itemName: 'Helium', levelOfConfidence: 4.0026, associatedItemNames: 'He'},
  {itemName: 'Lithium', levelOfConfidence: 6.941, associatedItemNames: 'Li'},
  {itemName: 'Beryllium', levelOfConfidence: 9.0122, associatedItemNames: 'Be'},
  {itemName: 'Boron', levelOfConfidence: 10.811, associatedItemNames: 'B'},
  {itemName: 'Carbon', levelOfConfidence: 12.0107, associatedItemNames: 'C'},
  {itemName: 'Nitrogen', levelOfConfidence: 14.0067, associatedItemNames: 'N'},
  {itemName: 'Oxygen', levelOfConfidence: 15.9994, associatedItemNames: 'O'},
  {itemName: 'Fluorine', levelOfConfidence: 18.9984, associatedItemNames: 'F'},
  { itemName: 'Neon', levelOfConfidence: 20.1797, associatedItemNames: 'Ne'},
  { itemName: 'Soldium', levelOfConfidence: 1.0079, associatedItemNames: 'Na'},
  { itemName: 'Magnesium', levelOfConfidence: 4.0026, associatedItemNames: 'Mg'},
  { itemName: 'Aluminium', levelOfConfidence: 6.941, associatedItemNames: 'Al'},
  { itemName: 'Silicon', levelOfConfidence: 9.0122, associatedItemNames: 'Si'},
  { itemName: 'Phosphorous', levelOfConfidence: 10.811, associatedItemNames: 'P'},
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
