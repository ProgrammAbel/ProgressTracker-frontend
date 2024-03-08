import { Component, AfterViewInit, ViewChild, Inject, ViewChildren, OnInit, QueryList } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ProgressTrackerApiService } from '../../services/progress-tracker-api.service';
import { MatDialog } from '@angular/material/dialog';
import { SubjectSelectDialogComponent } from '../dialogs/subject-select-dialog.component';
import { Observable, of, switchMap } from 'rxjs';

export interface Topic {
  topicId: number,
  topicName: string,
  topicCompleted: string,
  confidenceLevel: string,
  lastReviewed: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  topicsArray: Topic[][] = [];
  displayedColumns: string[] = ['topicId', 'topicName', 'topicCompleted', 'confidenceLevel', 'lastReviewed'];
  userSubjects: number[];

  table = [];
  @ViewChildren('tables') tables: QueryList<MatTable<Topic>>;


  constructor(public ptApi: ProgressTrackerApiService, public dialog: MatDialog) {}


  ngOnInit(): void {
    this.ptApi.getUserSubjects().subscribe((response: any) => {
      this.userSubjects = response.data;

      this.userSubjects.forEach(subject => {
        this.topicsArray.push([]);
      });
      this.renderTables(this.userSubjects!);
    },
    (error: any) => {
      this.openSubjectSelectDialog();
      this.renderAll();
    });
  }

  // getSubjectName(subjectIndex: number, subjectName: any = "") {
  //   if (subjectName !== "") {
  //     return subjectName;
  //   }

  //   let subjects: any[][];
  //   let name: string;
  //   let subjectId = this.userSubjects[subjectIndex];

  //   this.ptApi.getAllSubjects().subscribe(response => {
  //     subjects = response.data;
  //     subjects!.forEach(subject => {
  //       if (subject[0] === subjectId) {
  //         name = subject[1]
  //       }
  //     })
  //     this.getSubjectName(subjectIndex, name)      
  //   })
  // }

  renderAll() {
    this.tables.forEach((table: MatTable<Topic>) => table.renderRows());
  }

  renderTables(subjectIds: number[], index: number = 0) {
    if (index >= subjectIds.length) {
      console.log(this.topicsArray);
      this.renderAll();
      return;
    }

    this.ptApi.getOrderedList(subjectIds[index]).subscribe(response => {
      for (let i = 0; i < response.data.length; i++) {
        this.topicsArray[index].push({
          topicId: response.data[i][0],
          topicName: response.data[i][1],
          topicCompleted: response.data[i][2],
          confidenceLevel: response.data[i][3],
          lastReviewed: response.data[i][4],
        });
      };
      this.renderTables(subjectIds, index + 1);
    });

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
