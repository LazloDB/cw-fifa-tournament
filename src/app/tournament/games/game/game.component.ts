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
  @Input() type: string = '';

  homeScore = '';
  awayScore = '';

  isDisabled: boolean = false;

  constructor(private store: Store<State>) {
  }

  lockScore() {
    if (parseInt(this.homeScore) > -1 && parseInt(this.awayScore) > -1) {
      this.isDisabled = true;
      this.setPoints(parseInt(this.homeScore), parseInt(this.awayScore));
    }
  }

  setPoints(homeScore, awayScore) {
    let playerOne = {win: homeScore > awayScore, goals: homeScore, goals_against: awayScore};
    let playerTwo = {win: awayScore > homeScore, goals: awayScore, goals_against: homeScore};

    if (homeScore === awayScore) {
      this.store.dispatch({ type: 'ADD_POULE_DRAW', payload: {name: this.team[0].name, goals: homeScore} });
      this.store.dispatch({ type: 'ADD_POULE_DRAW', payload: {name: this.team[1].name, goals: homeScore} });
    } else {
      this.store.dispatch({ type: 'ADD_POULE_MATCH', payload: {name: this.team[0].name, goals: playerOne.goals, goals_against: playerOne.goals_against, win: playerOne.win} });
      this.store.dispatch({ type: 'ADD_POULE_MATCH', payload: {name: this.team[1].name, goals: playerTwo.goals, goals_against: playerTwo.goals_against, win: playerTwo.win} });
    }
  }

}
