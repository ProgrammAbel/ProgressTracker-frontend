import { Component, OnInit } from '@angular/core';
import { ProgressTrackerApiService } from '../services/progress-tracker-api.service';
import { SnackService } from '../services/snack.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

  constructor(private ptApi: ProgressTrackerApiService, private snack: SnackService) { }

  ngOnInit(): void {

    if (this.ptApi.isLoggedIn) {
      this.snack.authError();
    }

  }

}
