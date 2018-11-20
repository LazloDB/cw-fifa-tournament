import { Component, Input, OnInit } from "@angular/core";
import { ClubService } from "../../services/club.service";

@Component({
  selector: "app-knock-outs",
  templateUrl: "./knock-outs.component.html",
  styleUrls: ["./knock-outs.component.css"]
})
export class KnockOutsComponent implements OnInit {
  @Input() players: Array<any>;
  @Input() inTab: boolean = false;

  koPlayers: Array<any> = [];

  matches: any = [];
  winners: any = [];
  currentFree: Array<string> = [];
  gameWinner: string = "";

  constructor(private clubService: ClubService) {}

  ngOnInit() {
    this.koPlayers = this.koPlayers.concat(this.players);
    this.matches.push(this.inTab ? this.createMatchesFromPoules(this.koPlayers) : this.createMatchesFromScratch(this.koPlayers));
  }

  createMatchesFromScratch(players, random = true): any {
    let matchUp = { games: [], free: [] };
    let tempMatch = [];

    while (players.length > 0) {
      tempMatch = [];

      // always resort the array before splicing if random is true
      if (random)
        players = players.sort(() => {
          return 0.5 - Math.random();
        });

      if (players.length > 1) {
        for (let index = 0; index < 2; index++) {
          // get index of random player when random = true
          let position = random && players.length > 1 ? Math.round(Math.random() * (players.length - 1)) : 0;
          tempMatch.push({
            name: players.splice(position, 1),
            club: this.clubService.getClub()
          });
        }

        matchUp.games.push({match: tempMatch});
        this.currentFree = [];
      } else {
        matchUp.free.push(players.splice(0, 1));
        this.currentFree = matchUp.free;
      }
    }

    return matchUp;
  }

  createMatchesFromPoules(koPlayers: any) {
    let matchUp = { games: [], free: [] };
    let tempMatch = [];

    for (let index = 0; index < koPlayers.length; index++) {
      tempMatch = [];

      tempMatch.push({
        name: koPlayers[0].players.splice(0, 1),
        club: this.clubService.getClub()
      });

      tempMatch.push({
        name: koPlayers[1].players.splice(koPlayers[1].players.length - 1, 1),
        club: this.clubService.getClub()
      });

      matchUp.games.push({match: tempMatch});
    }

    return matchUp;
  }

  setNextRound(players: Array<string>): void {
    players = this.currentFree.concat(players);

    players.length > 1 ? this.matches.push(this.createMatchesFromScratch(players, false)) : this.setWinner(players[0]);
  }

  setWinner(player) {
    this.gameWinner = player;
  }
}
