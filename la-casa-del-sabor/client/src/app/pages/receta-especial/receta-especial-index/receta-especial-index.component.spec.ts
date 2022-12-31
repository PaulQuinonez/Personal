import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetaEspecialIndexComponent } from './receta-especial-index.component';

describe('RecetaEspecialIndexComponent', () => {
  let component: RecetaEspecialIndexComponent;
  let fixture: ComponentFixture<RecetaEspecialIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecetaEspecialIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetaEspecialIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
