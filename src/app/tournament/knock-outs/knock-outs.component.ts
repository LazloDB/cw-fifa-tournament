import { Component, Input, OnInit } from '@angular/core';
import { ClubService } from '../../services/club.service';

@Component({
  selector: 'app-knock-outs',
  templateUrl: './knock-outs.component.html',
  styleUrls: ['./knock-outs.component.css']
})
export class KnockOutsComponent implements OnInit {
  @Input() players: Array<any>;

  matches: any = [];
  winners: any = [];
  currentFree: Array<string> = [];

  constructor(private clubService: ClubService) { }

  ngOnInit() {
    this.matches.push(this.createMatches(this.players));
  }

  createMatches(players, random = true): any {
    let matchUp = { games: [], free: [] };
    let tempMatch = [];

    while (players.length > 0) {
      tempMatch = [];

      // always resort the array before splicing if random is true
      if (random) players = players.sort(() => { return 0.5 - Math.random()});

      if (players.length > 1) {
        for (let index = 0; index < 2; index++) {
          // get index of random player when random = true
          let index = random ? players.length > 1 ? Math.round(Math.random() * (players.length - 1)) : 0 : 0;
          tempMatch.push({name: players.splice(index, 1), club: this.clubService.getClub()});
        }

        matchUp.games.push(tempMatch);
        this.currentFree = [];
      } else {
        matchUp.free.push(players.splice(0,1));
        this.currentFree = matchUp.free;
      }
    }

    return matchUp;
  }

  setNextRound(players: Array<string>): void {
    players = players.concat(this.currentFree);
    this.matches.push(this.createMatches(players, false));
  }
}
