import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss']
})
export class SelectProductComponent implements OnInit {

  @Input() productName: String;
  constructor() { }

  ngOnInit() {
  }

}
