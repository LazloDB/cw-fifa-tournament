import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { ClubService } from "../../services/club.service";
import { Store } from "@ngrx/store";
import { State } from "../../common/reducers";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  @Input() matchUp: Array<any> = [];
  @Input() type: string = '';
  @Output() finish = new EventEmitter();

  matches: any = {};
  counter: number = 0;
  winners: Array<string> = [];

  constructor(private clubService: ClubService, private store: Store<State>) {
  }

  ngOnInit() {
    this.matches = this.type == 'poules' ? this.createScheme(this.matchUp) : this.matchUp;
  }

  createScheme(poules) {
    let tempMatches = [];

    poules.forEach((poule) => {
      tempMatches = tempMatches.concat(this.createMatches(poule));
    });

    return tempMatches;
  }

  createMatches(poule) {
    let result = [];
    for (let i = 0; i < poule.length; i++) {
      for (let j = i + 1; j < poule.length; j++) {
        result.push([{name: poule[i].name, club: this.clubService.getClub()}, {name: poule[j].name, club: this.clubService.getClub()}]);
      }
    }

    result = this.sortPoule(result, poule.length);

    return result;
  }

  sortPoule(result, length): Array<any> {
    if (length === 4) {
      return [result[0], result[5], result[1], result[4], result[2], result[3]];
    } else if (length === 5) {
      return [result[0], result[7], result[3], result[4], result[9], result[1], result[5], result[8], result[2], result[6]];
    } else {
      return result;
    }
  }

  handleGames(data: any) {
    this.counter++;

    if (this.type == 'poules') this.setPoints(data);

    if (this.type == 'knock-outs') this.setWinners(data);

    if (this.counter === this.matches.length) {
      this.finish.emit(this.winners);
    }
  }

  setPoints(data: any) {
    let playerOne = {win: data.homeScore > data.awayScore, goals: data.homeScore, goals_against: data.awayScore};
    let playerTwo = {win: data.awayScore > data.homeScore, goals: data.awayScore, goals_against: data.homeScore};

    if (data.homeScore === data.awayScore) {
      this.store.dispatch({ type: 'ADD_POULE_DRAW', payload: {name: data.homePlayer, goals: data.homeScore} });
      this.store.dispatch({ type: 'ADD_POULE_DRAW', payload: {name: data.awayPlayer, goals: data.homeScore} });
    } else {
      this.store.dispatch({ type: 'ADD_POULE_MATCH', payload: {name: data.homePlayer, goals: playerOne.goals, goals_against: playerOne.goals_against, win: playerOne.win} });
      this.store.dispatch({ type: 'ADD_POULE_MATCH', payload: {name: data.awayPlayer, goals: playerTwo.goals, goals_against: playerTwo.goals_against, win: playerTwo.win} });
    }
  }

  setWinners(data: any) {
    data.homeScore > data.awayScore ? this.winners.push(data.homePlayer) : this.winners.push(data.awayPlayer);
  }

}
