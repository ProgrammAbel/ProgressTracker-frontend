import { Component, AfterViewInit, ViewChild, Inject, ViewChildren } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ProgressTrackerApiService } from '../../services/progress-tracker-api.service';

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
export class DashboardComponent implements AfterViewInit {
  topicsArray: Topic[] = [];
  displayedColumns: string[] = ['topicId', 'lastReviewed', 'confidenceLevel'];


  constructor(private ptApi: ProgressTrackerApiService) {}

  @ViewChild(MatTable) table: MatTable<Topic>;

  ngAfterViewInit(): void {
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

}
