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
import { PoulesComponent } from './tournament/poules/poules.component';
import { StandingsComponent } from './tournament/standings/standings.component';
import { KnockOutsComponent } from './tournament/knock-outs/knock-outs.component';
import { GamesComponent } from './tournament/games/games.component';
import { Tabs } from './common/tabs/tabs.component';
import { Tab } from './common/tabs/tab/tab.component';
import { GameComponent } from './tournament/games/game/game.component';

// services
import { DeviceService } from './services/device.service';
import { ClubService } from './services/club.service';

import { NgPipesModule } from 'ngx-pipes';


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
    PoulesComponent,
    StandingsComponent,
    GamesComponent,
    GameComponent,
    Tabs,
    Tab,
    KnockOutsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      initialState: {
        players: {players: []},
        poules: {poules: []},
        clubs: {clubs: []},
      }
    }),
    HttpClientModule,
    NgPipesModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [DeviceService, ClubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
