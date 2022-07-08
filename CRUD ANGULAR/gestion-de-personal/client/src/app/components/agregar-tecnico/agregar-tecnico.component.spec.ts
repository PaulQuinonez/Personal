import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTecnicoComponent } from './agregar-tecnico.component';

describe('AgregarTecnicoComponent', () => {
  let component: AgregarTecnicoComponent;
  let fixture: ComponentFixture<AgregarTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarTecnicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
