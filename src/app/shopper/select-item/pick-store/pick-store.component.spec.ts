import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickStoreComponent } from './pick-store.component';

describe('PickStoreComponent', () => {
  let component: PickStoreComponent;
  let fixture: ComponentFixture<PickStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
