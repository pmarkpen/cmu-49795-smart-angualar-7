import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectItemComponent } from './shopper/select-item/select-item.component';
import {MatCardModule, MatButtonModule, MatListModule, MatTableModule, MatSortModule,MatPaginatorModule, MatInputModule} from '@angular/material';
import { PickStoreItemComponent } from './shopper/select-item/pick-store/pick-store-item/pick-store-item.component';
import { SelectProductComponent } from './shopper/select-item/select-product/select-product.component';
import { AssocialtionResultComponent } from './shopper/associaltion-result/associaltion-result.component';
import { UploadFileComponent } from './store/upload-file/upload-file.component';
import { StoreAssociationResultComponent } from './store/store-association-result/store-association-result.component';

const appRoutes: Routes = [
  { path: 'shopper/select-item', component: SelectItemComponent },
  { path: 'shopper/association-result', component: AssocialtionResultComponent },
  { path: 'store/upload-file', component: UploadFileComponent },
  { path: 'store/store-association-result', component: StoreAssociationResultComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    SelectItemComponent,
    PickStoreItemComponent,
    SelectProductComponent,
    AssocialtionResultComponent,
    UploadFileComponent,
    StoreAssociationResultComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
