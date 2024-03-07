import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectSelectDialogComponent } from './subject-select-dialog.component';

describe('SubjectSelectDialogComponent', () => {
  let component: SubjectSelectDialogComponent;
  let fixture: ComponentFixture<SubjectSelectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubjectSelectDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
