import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInscriptionComponent } from './view-inscription.component';

describe('ViewInscriptionComponent', () => {
  let component: ViewInscriptionComponent;
  let fixture: ComponentFixture<ViewInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInscriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
