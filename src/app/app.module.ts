import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectItemComponent } from './shopper/select-item/select-item.component';
import {MatCardModule, MatButtonModule} from '@angular/material';
import { PickStoreItemComponent } from './shopper/select-item/pick-store/pick-store-item/pick-store-item.component';
import { SelectProductComponent } from './shopper/select-item/select-product/select-product.component';
import { AssocialtionResultComponent } from './shopper/associaltion-result/associaltion-result.component';

const appRoutes: Routes = [
  { path: 'shopper/select-item', component: SelectItemComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    SelectItemComponent,
    PickStoreItemComponent,
    SelectProductComponent,
    AssocialtionResultComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
