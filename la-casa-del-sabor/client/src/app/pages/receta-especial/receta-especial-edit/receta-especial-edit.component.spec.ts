import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetaEspecialEditComponent } from './receta-especial-edit.component';

describe('RecetaEspecialEditComponent', () => {
  let component: RecetaEspecialEditComponent;
  let fixture: ComponentFixture<RecetaEspecialEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecetaEspecialEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetaEspecialEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
