import { ActionReducerMap } from '@ngrx/store';

import { players } from './players.reducer';
import { poules } from './poules.reducer';
import { clubs } from './clubs.reducer';

export interface State {
  players: any;
  poules: any;
  clubs: any;
}

export const reducers: ActionReducerMap<any> = {
  players,
  poules,
  clubs,
};
