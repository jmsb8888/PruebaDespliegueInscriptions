import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSubjectsComponent } from './show-subjects.component';

describe('ShowInspectionComponent', () => {
  let component: ShowSubjectsComponent;
  let fixture: ComponentFixture<ShowSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSubjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSubjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
