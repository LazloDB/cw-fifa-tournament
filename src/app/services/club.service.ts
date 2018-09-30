import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../common/reducers';

@Injectable()
export class ClubService {
  clubs: Array<string> = [];

  constructor(private store: Store<State>) {
    this.store.select('clubs').subscribe((v) => {
      this.clubs = v.clubs;
    })
  }

  getClub(): string {
    let clubs = this.clubs.sort(() => { return 0.5 - Math.random() });
    let rand = Math.floor(Math.random() * this.clubs.length);
    return clubs[rand];
  }

}
