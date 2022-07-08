import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTecnicosComponent } from './admin-tecnicos.component';

describe('AdminTecnicosComponent', () => {
  let component: AdminTecnicosComponent;
  let fixture: ComponentFixture<AdminTecnicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTecnicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTecnicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
