import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../common/reducers';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {
  clubs: Array<string> = [];
  clubName: string = "";


  constructor(private store: Store<State>) {
    this.store.select('clubs').subscribe((v) => {
      this.clubs = v.clubs;
    });
  }

  ngOnInit() {
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

  addTopTeams() {
    const topTeams = ['Arsenal', 'Atletico Madrid', 'Barcelona', 'Bayern München', 'Chelsea', 'Juventus', 'Liverpool', 'Manchester City', 'Manchester United', 'PSG', 'Real Madrid'];

    this.store.dispatch({ type: 'SET_CLUBS', payload: topTeams });
  }

}
