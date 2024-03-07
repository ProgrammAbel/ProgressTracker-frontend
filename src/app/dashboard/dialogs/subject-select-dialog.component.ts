import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-subject-select-dialog',
  template: `
    <h1 mat-dialog-title>Choose Subjects</h1>
    <div mat-dialog-content>
    <p>Pick at least one subject.</p>
    <ul>
      <li><mat-checkbox [(ngModel)]="data.userSubjects.maths">Maths</mat-checkbox></li>
      <li><mat-checkbox [(ngModel)]="data.userSubjects.physics">Physics</mat-checkbox></li>
      <li><mat-checkbox [(ngModel)]="data.userSubjects.cs">Computer Science</mat-checkbox></li>
    </ul>
    <div mat-dialog-actions>
      <button mat-stroked-button (click)="onNoClick()">Cancel</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="data.userSubjects" cdkFocusInitial>
        Add
      </button>
    </div>
  `,
  styles: `
    ul {
      list-style-type: none;
    }
  `
})
export class SubjectSelectDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SubjectSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
