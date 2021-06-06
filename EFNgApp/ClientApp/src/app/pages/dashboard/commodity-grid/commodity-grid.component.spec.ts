import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommodityGridComponent } from './commodity-grid.component';

describe('CommodityGridComponent', () => {
  let component: CommodityGridComponent;
  let fixture: ComponentFixture<CommodityGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommodityGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommodityGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
