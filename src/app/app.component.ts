import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './common/reducers';
import { player } from './common/models/player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  stage: number = 0;
  poules: Array<any> = [];
  isSetup: boolean = false;
  players: Array<string>;
  type: string = '';

  constructor(private store: Store<State>) {
    this.store.select('players').subscribe((v) => {
      this.players = v.players;
    });

    this.store.select('poules').subscribe((v) => {
      this.poules = v.poules;
    });
  }

  setType(type: string) {
    if (type == 'poules') {
      this.createPoules(this.players);
    }

    this.type = type;
    this.isSetup = true;
  }

  createPoules(players: Array<string>): void {
    const playerCount = players.length;

    if (players.length < 6) {
      players = players.sort(() => { return 0.5 - Math.random() });
      this.store.dispatch({ type: 'ADD_POULES', payload: [players.map((v) => this.createPlayer(v))] });
    } else if (players.length >= 6 && players.length < 10) {
      let pouleA = [];
      let pouleB = [];

      for(let i = 0; i < playerCount; i++) {
        // always resort the array before splicing
        players = players.sort(() => { return 0.5 - Math.random()});

        // get index of random player
        let index = players.length > 1 ? Math.round(Math.random() * (players.length - 1)) : 0;

        // push random player into poule
        players.length % 2 == 0 ? pouleA.push(this.createPlayer(players.splice(index, 1))) : pouleB.push(this.createPlayer(players.splice(index, 1)));
      }

      this.store.dispatch({ type: 'ADD_POULES', payload: [pouleA] });
      this.store.dispatch({ type: 'ADD_POULES', payload: [pouleB] });
    }
  }

  createPlayer(playerName: Array<string> | string): player {
    return {
      name: typeof playerName == 'string' ? playerName : playerName[0],
      points: 0,
      played: 0,
      goals: 0,
      goals_against: 0,
      goal_difference: 0,
      wins: 0,
      draws: 0,
      losses: 0,
    }
  }
}
