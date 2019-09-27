import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveIncomeComponent } from './save-income.component';

describe('SaveIncomeComponent', () => {
  let component: SaveIncomeComponent;
  let fixture: ComponentFixture<SaveIncomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveIncomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
