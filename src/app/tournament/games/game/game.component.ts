import { Component, Input } from "@angular/core";
import { isNumber } from "util";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  @Input() team: Array<any> = [];

  homeScore = '';
  awayScore = '';

  isDisabled: boolean = false;

  constructor() {}

  lockScore() {
    if (parseInt(this.homeScore) > -1 && parseInt(this.awayScore) > -1) {
      this.isDisabled = true;
    }
  }

}
