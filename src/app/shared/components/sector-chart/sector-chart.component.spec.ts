import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorChartComponent } from './sector-chart.component';

describe('SectorChartComponent', () => {
  let component: SectorChartComponent;
  let fixture: ComponentFixture<SectorChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
