import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyProfitComponent } from './yearly-profit.component';

describe('YearlyProfitComponent', () => {
  let component: YearlyProfitComponent;
  let fixture: ComponentFixture<YearlyProfitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearlyProfitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlyProfitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
