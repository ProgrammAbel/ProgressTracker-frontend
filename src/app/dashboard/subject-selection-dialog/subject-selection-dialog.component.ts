import { Component } from '@angular/core';
import { ProgressTrackerApiService } from '../../services/progress-tracker-api.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
export interface Subjects {
  maths: boolean,
  computerScience: boolean,
  physics: boolean
}

@Component({
  selector: 'app-subject-selection-dialog',
  templateUrl: './subject-selection-dialog.component.html',
  styleUrl: './subject-selection-dialog.component.scss'
})
export class SubjectSelectionDialogComponent {

  selectedSubjects: any = {
    maths: false,
    computerScience: false,
    physics: false
  };

  constructor(public ptApi: ProgressTrackerApiService, private dialogRef: MatDialogRef<SubjectSelectionDialogComponent>) { }

  onOkClick(): void {
    const selectedSubjectsArray = Object.keys(this.selectedSubjects).filter(key => this.selectedSubjects[key]);
    if (selectedSubjectsArray.length === 0) {
      alert('Please select at least one subject.');
      return;
    }
    this.dialogRef.close(selectedSubjectsArray);
  }
}
