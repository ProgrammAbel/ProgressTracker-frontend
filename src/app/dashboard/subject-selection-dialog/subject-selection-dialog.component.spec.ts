import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectSelectionDialogComponent } from './subject-selection-dialog.component';

describe('SubjectSelectionDialogComponent', () => {
  let component: SubjectSelectionDialogComponent;
  let fixture: ComponentFixture<SubjectSelectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubjectSelectionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubjectSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
