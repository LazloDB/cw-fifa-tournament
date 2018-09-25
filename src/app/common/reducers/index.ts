import { ActionReducerMap } from '@ngrx/store';

import { players } from './players.reducer';

export interface State {
  players: any;
}

export const reducers: ActionReducerMap<any> = {
  players,
};
