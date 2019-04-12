import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectItemComponent } from './shopper/select-item/select-item.component';
import { MatCardModule, MatButtonModule, MatListModule, MatTableModule, MatSortModule, MatPaginatorModule, MatInputModule } from '@angular/material';
import { PickStoreItemComponent } from './shopper/select-item/pick-store/pick-store-item/pick-store-item.component';
import { SelectProductComponent } from './shopper/select-item/select-product/select-product.component';
import { AssocialtionResultComponent } from './shopper/associaltion-result/associaltion-result.component';
import { UploadFileComponent } from './store/upload-file/upload-file.component';
import { StoreAssociationResultComponent } from './store/store-association-result/store-association-result.component';
import { StoreInformationService } from './store-information.service';
import { MyFilterPipe } from './filter';
import { FormsModule } from '@angular/forms';
import * as firebase from 'firebase';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from './auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/pre-login/login', pathMatch: 'full' },
  {
    path: 'after-login'
    , loadChildren: './after-login/after-login.module#AfterLoginModule'
    , canActivate: [AuthGuardService]
  }, {
    path: 'pre-login'
    , loadChildren: './pre-login/pre-login.module#PreLoginModule'
  }
];


@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
  ],
  providers: [StoreInformationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
