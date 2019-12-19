import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoToolsComponent } from './contenido-tools.component';

describe('ContenidoToolsComponent', () => {
  let component: ContenidoToolsComponent;
  let fixture: ComponentFixture<ContenidoToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContenidoToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenidoToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
