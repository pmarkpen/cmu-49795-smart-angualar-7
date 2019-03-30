import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpShopperComponent } from './sign-up-shopper.component';

describe('SignUpShopperComponent', () => {
  let component: SignUpShopperComponent;
  let fixture: ComponentFixture<SignUpShopperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpShopperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpShopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
