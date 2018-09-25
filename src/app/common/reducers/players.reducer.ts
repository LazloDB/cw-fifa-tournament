import { Action } from '../models/action';

export function players(state: any, action: Action) {
    switch (action.type) {
        case 'ADD_PLAYER':
            return {
              ...state,
              players: [...state.players, ...action.payload]
            }
        case 'REMOVE_PLAYER':
            return {
              ...state,
              players: [...state.players.filter((v) => v !== action.payload)]
            }
        default:
            return state;
    }
}
