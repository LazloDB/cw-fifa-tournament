import { Component, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../common/reducers';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent {
  clubs: Array<string> = [];
  clubName: string = "";

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == 'Enter' && this.clubName.trim() !== '') {
      this.addClub();
    }
  }


  constructor(private store: Store<State>) {
    this.store.select('clubs').subscribe((v) => {
      this.clubs = v.clubs;
    });
  }

  addClub(): void {
    if (this.clubs.indexOf(this.clubName) < 0 && this.clubName.trim() !== '') {
      this.store.dispatch({ type: 'ADD_CLUB', payload: this.clubName });
    }

    this.clubName = '';
  }

  remove(club: string): void {
    this.store.dispatch({ type: 'REMOVE_CLUB', payload: club });
  }

  addTopTeams(): void {
    const topTeams = ['Arsenal', 'Atletico Madrid', 'Barcelona', 'Bayern München', 'Chelsea', 'Juventus', 'Liverpool', 'Manchester City', 'Manchester United', 'PSG', 'Real Madrid'];

    this.store.dispatch({ type: 'SET_CLUBS', payload: topTeams });
  }

  addNationalTeams(): void {
    const nationalTeams = ['Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Chile', 'China', 'Colombia', 'Denmark', 'England', 'France', 'Germany', 'Netherlands', 'Italy', 'Japan', 'Korea', 'Mexico', 'Norway', 'Poland', 'Portugal', 'Rep. Ireland', 'Saudi Arabia', 'Scotland', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'USA / Canada'];

    this.store.dispatch({ type: 'SET_CLUBS', payload: nationalTeams });
  }

}
