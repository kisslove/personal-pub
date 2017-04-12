import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundForAddComponent } from './fund-for-add.component';

describe('FundForAddComponent', () => {
  let component: FundForAddComponent;
  let fixture: ComponentFixture<FundForAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundForAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundForAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
