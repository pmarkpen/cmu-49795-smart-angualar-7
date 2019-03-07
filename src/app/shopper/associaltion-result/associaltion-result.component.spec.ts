import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssocialtionResultComponent } from './associaltion-result.component';

describe('AssocialtionResultComponent', () => {
  let component: AssocialtionResultComponent;
  let fixture: ComponentFixture<AssocialtionResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssocialtionResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssocialtionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
