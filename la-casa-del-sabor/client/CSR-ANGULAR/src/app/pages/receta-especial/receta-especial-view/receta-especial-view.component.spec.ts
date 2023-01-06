import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetaEspecialViewComponent } from './receta-especial-view.component';

describe('RecetaEspecialViewComponent', () => {
  let component: RecetaEspecialViewComponent;
  let fixture: ComponentFixture<RecetaEspecialViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecetaEspecialViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetaEspecialViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
