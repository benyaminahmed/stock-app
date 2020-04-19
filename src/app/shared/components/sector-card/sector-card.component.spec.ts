import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorCardComponent } from './sector-card.component';

describe('SectorCardComponent', () => {
  let component: SectorCardComponent;
  let fixture: ComponentFixture<SectorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
