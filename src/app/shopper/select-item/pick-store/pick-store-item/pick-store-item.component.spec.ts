import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickStoreItemComponent } from './pick-store-item.component';

describe('PickStoreItemComponent', () => {
  let component: PickStoreItemComponent;
  let fixture: ComponentFixture<PickStoreItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickStoreItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickStoreItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
