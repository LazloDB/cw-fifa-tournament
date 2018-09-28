import { Action } from '../models/action';
import { player } from '../models/player';

export function poules(state: any, action: Action) {
    switch (action.type) {
        case 'ADD_POULES':
            return {
              ...state,
              poules: [...state.poules, ...action.payload]
            }
        case 'ADD_POULE_DATA':
            return {
              ...state,
              poules: state.poules.map(
                (poule) => poule.map(
                  (v: player) => v.name === action.payload.name ? {...v, points: action.payload.won ? v.points + 3 : v.points, played: v.played + 1} : v
                )
              )
            }
        default:
            return state;
    }
}
