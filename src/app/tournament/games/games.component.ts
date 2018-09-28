import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../../common/reducers";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  @Input() poules: Array<any> = [];

  matches: any = {};
  clubs: Array<string> = [];

  constructor(private store: Store<State>) {
    this.store.select('clubs').subscribe((v) => {
      this.clubs = v.clubs;
    })
  }

  ngOnInit() {
    this.matches = this.createScheme(this.poules);
  }

  createScheme(poules) {
    let tempPoules = [];

    poules.forEach((poule) => {
      tempPoules = tempPoules.concat(this.createMatches(poule));
    });

    return tempPoules;
  }

  createMatches(poule) {
    const result = [];
    for (let i = 0; i < poule.length; i++) {
      for (let j = i + 1; j < poule.length; j++) {
        result.push([{name: poule[i].name, club: this.getClub()}, {name: poule[j].name, club: this.getClub()}]);
      }
    }

    return result;
  }

  getClub(): string {
    let clubs = this.clubs.sort(() => { return 0.5 - Math.random() });
    let rand = Math.round(Math.random() * this.clubs.length);
    console.log(rand);
    return clubs[rand];
  }

}
