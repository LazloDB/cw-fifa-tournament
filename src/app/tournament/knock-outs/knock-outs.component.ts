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

  constructor(private clubService: ClubService) { }

  ngOnInit() {
    this.matches = this.createMatches(this.players);
  }

  createMatches(players): Array<any> {
    let matchUp = [];
    let tempMatch = [];

    while (players.length > 0) {
      tempMatch = [];

      // always resort the array before splicing
      players = players.sort(() => { return 0.5 - Math.random()});

      if (players.length > 1) {
        for (let index = 0; index < 2; index++) {
          // get index of random player
          let index = players.length > 1 ? Math.round(Math.random() * (players.length - 1)) : 0;
          tempMatch.push({name: players.splice(index, 1), club: this.clubService.getClub()});
        }
      } else {
        tempMatch = players.splice(0,1);
      }

      matchUp.push(tempMatch);
    }

    return matchUp;
  }
}
