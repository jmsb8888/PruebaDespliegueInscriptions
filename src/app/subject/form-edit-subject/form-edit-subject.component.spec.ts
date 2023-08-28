import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditSubjectComponent } from './form-edit-subject.component';

describe('FormEditSubjectComponent', () => {
  let component: FormEditSubjectComponent;
  let fixture: ComponentFixture<FormEditSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEditSubjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormEditSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
