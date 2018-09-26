import { Component, Input, OnInit } from "@angular/core";
import { player } from "../../common/models/player";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  @Input() poules: Array<any> = [];

  matches: any = {};

  constructor() {}

  ngOnInit() {
    this.matches = this.createScheme(this.poules);
  }

  createScheme(poules) {
    let tempPoules = {};

    poules.forEach((poule, index) => {
      tempPoules['poule' + index] = this.createMatches(poule);
    });

    return tempPoules;
  }

  createMatches(poule) {
    const result = [];
    for (let i = 0; i < poule.length; i++) {
      for (let j = i + 1; j < poule.length; j++) {
        result.push([poule[i].name, poule[j].name]);
      }
    }

    return result;
  }

}
