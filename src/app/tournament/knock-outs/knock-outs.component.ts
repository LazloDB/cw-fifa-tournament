import { Component, Input, OnInit } from '@angular/core';
import { ClubService } from '../../services/club.service';

@Component({
  selector: 'app-knock-outs',
  templateUrl: './knock-outs.component.html',
  styleUrls: ['./knock-outs.component.css']
})
export class KnockOutsComponent implements OnInit {
  @Input() players: Array<any>;
  @Input() inTab: boolean = false;

  koPlayers: Array<any> = [];

  matches: any = [];
  winners: any = [];
  currentFree: Array<string> = [];
  gameWinner: string = '';

  constructor(private clubService: ClubService) { }

  ngOnInit() {
    this.koPlayers = this.koPlayers.concat(this.players);
    this.matches.push(this.createMatches(this.koPlayers, !this.inTab));
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
    players = this.currentFree.concat(players);

    players.length > 1 ? this.matches.push(this.createMatches(players, false)) : this.setWinner(players[0]);
  }

  setWinner(player) {
    this.gameWinner = player;
  }
}
