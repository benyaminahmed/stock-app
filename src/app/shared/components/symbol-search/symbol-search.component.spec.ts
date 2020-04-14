import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolSearchComponent } from './symbol-search.component';

describe('SymbolSearchComponent', () => {
  let component: SymbolSearchComponent;
  let fixture: ComponentFixture<SymbolSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
