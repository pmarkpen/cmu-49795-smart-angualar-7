import { Component, OnInit } from '@angular/core';
import { StoreInformationService } from '../../store-information.service';
import { ShopperInformationService } from '../../shopper-information.service';

@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.scss']
})
export class AfterLoginComponent implements OnInit {

  constructor(private storeInformationService: StoreInformationService, 
    private shopperInformationService: ShopperInformationService) { }

  ngOnInit() {
  }

  isStore(): boolean {
    return this.storeInformationService.isStore;
  }

  isShopper(): boolean {
    return this.shopperInformationService.isShopper;
  }

}
