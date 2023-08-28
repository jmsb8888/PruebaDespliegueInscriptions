import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInscriptionsComponent } from './create-inscriptions.component';

describe('CreateInscriptionsComponent', () => {
  let component: CreateInscriptionsComponent;
  let fixture: ComponentFixture<CreateInscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateInscriptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateInscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
