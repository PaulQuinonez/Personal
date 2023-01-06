import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetaEspecialCreateComponent } from './receta-especial-create.component';

describe('RecetaEspecialCreateComponent', () => {
  let component: RecetaEspecialCreateComponent;
  let fixture: ComponentFixture<RecetaEspecialCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecetaEspecialCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetaEspecialCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
