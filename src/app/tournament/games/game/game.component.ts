import { Component, Input } from "@angular/core";
import { isNumber } from "util";
import { Store } from "@ngrx/store";
import { State } from "../../../common/reducers";

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

  constructor(private store: Store<State>) {}

  lockScore() {
    if (parseInt(this.homeScore) > -1 && parseInt(this.awayScore) > -1) {
      this.isDisabled = true;
      this.store.dispatch({ type: 'ADD_POULE_INFO', payload: '' });
    }
  }

}
