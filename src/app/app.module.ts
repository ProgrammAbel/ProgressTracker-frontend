import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedModule } from './shared/shared.module';
import { HomePageComponent } from './home-page/home-page.component';
import { ProgressTrackerApiService } from './services/progress-tracker-api.service';
import { SubjectSelectionDialogComponent } from './dashboard/subject-selection-dialog/subject-selection-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SubjectSelectionDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    ProgressTrackerApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
