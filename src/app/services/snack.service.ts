import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SnackService {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  authError() {
    let snackBarRef = this.snackBar.open('You must be logged in!', 'OK', {
      duration: 5000
    });

    this.router.navigate(['/login']);
  }
}