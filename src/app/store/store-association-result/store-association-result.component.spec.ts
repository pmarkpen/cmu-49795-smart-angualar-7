import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreAssociationResultComponent } from './store-association-result.component';

describe('StoreAssociationResultComponent', () => {
  let component: StoreAssociationResultComponent;
  let fixture: ComponentFixture<StoreAssociationResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreAssociationResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreAssociationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
