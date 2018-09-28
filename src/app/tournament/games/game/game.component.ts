import { Component, Input } from "@angular/core";
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

  constructor(private store: Store<State>) {
  }

  lockScore() {
    if (parseInt(this.homeScore) > -1 && parseInt(this.awayScore) > -1) {
      this.isDisabled = true;
      this.setPoints(this.homeScore, this.awayScore);
    }
  }

  setPoints(homeScore, awayScore) {
    let winner;
    let loser;
    let goals;
    let goals_against;

    if (homeScore > awayScore) {
      winner = this.team[0].name;
      loser = this.team[1].name;
      goals = homeScore;
      goals_against = awayScore;
    } else if (homeScore < awayScore) {
      winner = this.team[1].name;
      loser = this.team[0].name;
      goals = awayScore;
      goals_against = homeScore;
    } else {
      winner = null;
      loser = null;
    }

    if (!winner && !loser) {
      this.store.dispatch({ type: 'ADD_POULE_DRAW', payload: {name: this.team[0].name, goals: homeScore} });
      this.store.dispatch({ type: 'ADD_POULE_DRAW', payload: {name: this.team[1].name, goals: homeScore} });
    } else {
      this.store.dispatch({ type: 'ADD_POULE_WIN', payload: {name: winner, goals: goals, goals_against: goals_against} });
      this.store.dispatch({ type: 'ADD_POULE_LOSS', payload: {name: loser, goals: goals, goals_against: goals_against} });
    }
  }

}
