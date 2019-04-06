import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualCartComponent } from './virtual-cart.component';

describe('VirtualCartComponent', () => {
  let component: VirtualCartComponent;
  let fixture: ComponentFixture<VirtualCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
