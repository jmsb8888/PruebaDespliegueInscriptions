import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSudentComponent } from './details-sudent.component';

describe('DetailsSudentComponent', () => {
  let component: DetailsSudentComponent;
  let fixture: ComponentFixture<DetailsSudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsSudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsSudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
