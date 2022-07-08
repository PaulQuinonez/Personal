import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTecnicoComponent } from './ver-tecnico.component';

describe('VerTecnicoComponent', () => {
  let component: VerTecnicoComponent;
  let fixture: ComponentFixture<VerTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerTecnicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
