import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitcoinCalcWidgetComponent } from './bitcoin-calc-widget.component';

describe('BitcoinCalcWidgetComponent', () => {
  let component: BitcoinCalcWidgetComponent;
  let fixture: ComponentFixture<BitcoinCalcWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitcoinCalcWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitcoinCalcWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
