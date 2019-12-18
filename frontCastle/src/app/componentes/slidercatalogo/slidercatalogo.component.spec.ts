import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidercatalogoComponent } from './slidercatalogo.component';

describe('SlidercatalogoComponent', () => {
  let component: SlidercatalogoComponent;
  let fixture: ComponentFixture<SlidercatalogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidercatalogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidercatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
