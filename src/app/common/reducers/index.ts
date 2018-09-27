import { ActionReducerMap } from '@ngrx/store';

import { players } from './players.reducer';
import { poules } from './poules.reducer';

export interface State {
  players: any;
  poules: any;
}

export const reducers: ActionReducerMap<any> = {
  players,
  poules,
};
