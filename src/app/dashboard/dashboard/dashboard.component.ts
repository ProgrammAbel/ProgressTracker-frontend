import { Component, AfterViewInit, ViewChild, Inject, ViewChildren, OnInit } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ProgressTrackerApiService } from '../../services/progress-tracker-api.service';
import { MatDialog } from '@angular/material/dialog';
import { SubjectSelectDialogComponent } from '../dialogs/subject-select-dialog.component';
import { Observable, of, switchMap } from 'rxjs';

export interface Topic {
  topicId: string,
  lastReviewed: string,
  confidenceLevel: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  topicsArray: Topic[] = [];
  displayedColumns: string[] = ['topicId', 'lastReviewed', 'confidenceLevel'];


  constructor(private ptApi: ProgressTrackerApiService, public dialog: MatDialog) {}

  @ViewChild(MatTable) table: MatTable<Topic>;

  ngOnInit(): void {
    console.log(this.openSubjectSelectDialog());
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

  openSubjectSelectDialog(): void {
    const dialogRef = this.dialog.open(SubjectSelectDialogComponent, {
      width: '400px',
      data: {
        userSubjects: {
          maths: false,
          physics: false,
          cs: false
        }
      }
    });


    let subjectExists = false;

    // return dialogRef.afterClosed().pipe(
    //   switchMap(result => {
    //     let subjectExists = Object.values(result).some(subject => subject);
    //     if (!subjectExists) {
    //       return this.openSubjectSelectDialog();
    //     }
    //     return of(result as any);
    //   })
    // );

    dialogRef.afterClosed().subscribe(result => {
      Object.values(result).forEach(subject => {
        if (subject) {
          subjectExists = true;
        }
      });

      if (!subjectExists) {
        this.openSubjectSelectDialog();
      } else {
        let chosenSubjects: string[] = [];
        Object.keys(result).forEach(subject => {
          if (result[subject]) {
            chosenSubjects.push(subject)
          }
        });
        let subjectIds: number[] = [];
        chosenSubjects.forEach(subject => {
          switch (subject) {
            case 'maths':
              subjectIds.push(1);
              break;
            
            case 'cs':
              subjectIds.push(2);
              break;

            case 'physics':
              subjectIds.push(3);
              break;
          }
        });

        return this.ptApi.addUserSubjects(subjectIds);
      }

    });

  }
}
