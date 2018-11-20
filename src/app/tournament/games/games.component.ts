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

    if (poules.length > 1) tempMatches.sort((a, b) => a.game - b.game);

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
      return [
        {game: 1, match: result[0]},
        {game: 2, match: result[5]},
        {game: 3, match: result[1]},
        {game: 4, match: result[4]},
        {game: 5, match: result[2]},
        {game: 6, match: result[3]}];
    } else if (length === 5) {
      return [
        {game: 1, match: result[0]},
        {game: 2, match: result[7]},
        {game: 3, match: result[3]},
        {game: 4, match: result[4]},
        {game: 5, match: result[9]},
        {game: 6, match: result[1]},
        {game: 7, match: result[5]},
        {game: 8, match: result[8]},
        {game: 9, match: result[2]},
        {game: 10, match: result[6]}];
    } else {
      let newResult = [];

      result.forEach((v, key) => {
        newResult.push({game: key, match: v});
      });

      console.log(result);
      console.log(newResult);
      return newResult;
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

      console.log(this.matchUp);
    }
  }

  setWinners(data: any) {
    data.homeScore > data.awayScore ? this.winners.push(data.homePlayer) : this.winners.push(data.awayPlayer);
  }

}
