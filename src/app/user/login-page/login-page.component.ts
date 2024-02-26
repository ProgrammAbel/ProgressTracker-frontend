import { Component } from '@angular/core';
import { ProgressTrackerApiService } from '../../services/progress-tracker-api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  constructor(public ptApi: ProgressTrackerApiService) { }

}
