import { Component, Input, OnInit } from "@angular/core";
import { ClubService } from "../../services/club.service";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  @Input() matchUp: Array<any> = [];
  @Input() type: string = '';

  matches: any = {};

  constructor(private clubService: ClubService) {
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

}
