import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// reducers
import { reducers } from './common/reducers/index';

// components
import { AppComponent } from './app.component';
import { SetupComponent } from './setup/setup.component';
import { PeopleComponent } from './setup/people/people.component';
import { ProgressComponent } from './setup/progress/progress.component';
import { ClubsComponent } from './setup/clubs/clubs.component';
import { MatchTypeComponent } from './setup/match-type/match-type.component';

// services
import { DeviceService } from './services/device.service';
import { TournamentComponent } from './tournament/tournament.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    SetupComponent,
    PeopleComponent,
    ProgressComponent,
    ClubsComponent,
    MatchTypeComponent,
    TournamentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      initialState: {
        players: {players: []}
      }
    }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [DeviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
