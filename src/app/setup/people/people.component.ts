import { Component, Input, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../common/reducers';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent {
  @Input() people: Array<string> = [];
  playerName: string = "";

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == 'Enter' && this.playerName.trim() !== '') {
      this.addPerson();
    }
  }


  constructor(private store: Store<State>) {

  }

  addPerson(): void {
    if (this.people.indexOf(this.playerName) < 0 && this.playerName.trim() !== '') {
      this.store.dispatch({ type: 'ADD_PLAYER', payload: this.playerName });
    }

    this.playerName = '';
  }

  remove(person: string): void {
    this.store.dispatch({ type: 'REMOVE_PLAYER', payload: person });
  }

}
