import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../common/reducers';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent {
  @Input() stage: number = 0;

  @Output() setType = new EventEmitter();

  people: Array<string> = [];


  constructor(private store: Store<State>) {
    this.store.select('players').subscribe((v) => {
      this.people = v.players;
    });
   }

  next() {
    this.stage = this.stage + 1;
  }

  setStage(stage: number) {
    this.stage = stage;
  }

}
