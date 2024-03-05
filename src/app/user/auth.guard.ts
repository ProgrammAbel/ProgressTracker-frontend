import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ProgressTrackerApiService } from '../services/progress-tracker-api.service';
import { SnackService } from '../services/snack.service';

export const authGuard: CanActivateFn = (route, state) => {
  const ptApi = inject(ProgressTrackerApiService)
  const snack = inject(SnackService)

  if (!ptApi.isLoggedIn) {
    snack.authError();
    return false;
  }
  return true;
};
