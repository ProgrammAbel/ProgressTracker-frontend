import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTable } from '@angular/material/table';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { ProgressTrackerApiService } from '../../services/progress-tracker-api.service';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { SubjectSelectionDialogComponent } from '../subject-selection-dialog/subject-selection-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  topicsArray: object[] = [];
  displayedColumns: string[] = ['topicId', 'lastReviewed', 'confidenceLevel']

  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private ptApi: ProgressTrackerApiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.openDialog()
    this.ptApi.getOrderedList(2).subscribe(response => {
      for (let i = 0; i < response.data.length; i++) {
        this.topicsArray.push({
          topicId: response.data[i][0],
          lastReviewed: response.data[i][1],
          confidenceLevel: response.data[i][2]
        });
      }
    });
    console.log(this.topicsArray);
    this.table.renderRows();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SubjectSelectionDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }

}
