import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyHistoryComponent } from './money-history.component';

describe('MoneyHistoryComponent', () => {
  let component: MoneyHistoryComponent;
  let fixture: ComponentFixture<MoneyHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneyHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneyHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
