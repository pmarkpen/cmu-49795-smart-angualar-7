import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectItemComponent } from './shopper/select-item/select-item.component';
import { PickStoreComponent } from './shopper/select-item/pick-store/pick-store.component';
import {MatCardModule} from '@angular/material';

const appRoutes: Routes = [
  { path: 'shopper/select-item', component: SelectItemComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    SelectItemComponent,
    PickStoreComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
