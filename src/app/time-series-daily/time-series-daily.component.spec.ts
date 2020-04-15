import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSeriesDailyComponent } from './time-series-daily.component';

describe('TimeSeriesDailyComponent', () => {
  let component: TimeSeriesDailyComponent;
  let fixture: ComponentFixture<TimeSeriesDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeSeriesDailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSeriesDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
