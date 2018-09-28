import { Component, Input } from "@angular/core";
import { isNumber } from "util";
import { Store } from "@ngrx/store";
import { State } from "../../../common/reducers";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  @Input() team: Array<any> = [];

  homeScore = '';
  awayScore = '';

  isDisabled: boolean = false;

  constructor(private store: Store<State>) {}

  lockScore() {
    if (parseInt(this.homeScore) > -1 && parseInt(this.awayScore) > -1) {
      this.isDisabled = true;
      this.setPoints(this.homeScore, this.awayScore);
    }
  }

  setPoints(homeScore, awayScore) {
    let winner;
    let loser;

    if (homeScore > awayScore) {
      winner = this.team[0];
      loser = this.team[1];
    } else if (homeScore < awayScore) {
      winner = this.team[1];
      loser = this.team[0];
    } else {
      winner = null;
      loser = null;
    }

    this.store.dispatch({ type: 'ADD_POULE_DATA', payload: {name: winner, won: true, draw: false} });

  }

}
