import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from './auth-guard.service';
import { ShopperInformationService } from './shopper-information.service';
import { StoreInformationService } from './store-information.service';
import { ExampleSubjectService } from './example-subject.service';
import { ExampleBehavioralSubjectService } from './example-behavioral-subject.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
})
export class SharedServiceModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedServiceModule,
      providers: [AuthGuardService, ShopperInformationService, StoreInformationService, ExampleSubjectService, ExampleBehavioralSubjectService]
    }
  }
}
