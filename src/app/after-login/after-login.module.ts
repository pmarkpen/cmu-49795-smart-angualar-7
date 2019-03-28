import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfterLoginComponent } from './after-login/after-login.component';
import { DashBoardComponent } from '../dash-board/dash-board.component';
import { SelectItemComponent } from '../shopper/select-item/select-item.component';
import { AssocialtionResultComponent } from '../shopper/associaltion-result/associaltion-result.component';
import { UploadFileComponent } from '../store/upload-file/upload-file.component';
import { StoreAssociationResultComponent } from '../store/store-association-result/store-association-result.component';
import { Routes, RouterModule } from '@angular/router';
import { PickStoreItemComponent } from '../shopper/select-item/pick-store/pick-store-item/pick-store-item.component';
import { SelectProductComponent } from '../shopper/select-item/select-product/select-product.component';
import { MyFilterPipe } from '../filter';
import { MatCardModule, MatButtonModule, MatListModule, MatTableModule, MatSortModule, MatPaginatorModule, MatInputModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [{
  path: '', component: AfterLoginComponent, children: [
    { path: 'home', component: DashBoardComponent },
    { path: 'shopper/select-item', component: SelectItemComponent },
    { path: 'shopper/association-result/:storeId/:productId', component: AssocialtionResultComponent },
    { path: 'store/upload-file', component: UploadFileComponent },
    { path: 'store/store-association-result', component: StoreAssociationResultComponent },
  ]
}];


@NgModule({
  declarations: [AfterLoginComponent,
    SelectItemComponent,
    PickStoreItemComponent,
    SelectProductComponent,
    AssocialtionResultComponent,
    UploadFileComponent,
    StoreAssociationResultComponent,
    MyFilterPipe,
    DashBoardComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(
      appRoutes
    ),
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule
  ]
})
export class AfterLoginModule { }
