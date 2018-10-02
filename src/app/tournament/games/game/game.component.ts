import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  @Input() team: Array<any> = [];
  @Input() type: string = '';
  @Output() finish = new EventEmitter();

  homeScore = '';
  awayScore = '';

  isDisabled: boolean = false;

  constructor() {
  }

  lockScore() {
    if (parseInt(this.homeScore) > -1 && parseInt(this.awayScore) > -1) {

      this.isDisabled = (this.homeScore == this.awayScore && this.type == 'knock-outs') ? false : true;

      this.finish.emit({homeScore: parseInt(this.homeScore), awayScore: parseInt(this.awayScore), homePlayer: this.team[0].name, awayPlayer: this.team[1].name});
    }
  }

}
