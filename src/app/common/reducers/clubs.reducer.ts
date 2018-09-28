import { Action } from '../models/action';

export function clubs(state: any, action: Action) {
    switch (action.type) {
        case 'ADD_CLUB':
            return {
              ...state,
              clubs: [...state.clubs, ...action.payload]
            }
        case 'REMOVE_CLUB':
            return {
              ...state,
              clubs: [...state.clubs.filter((v) => v !== action.payload)]
            }
        case 'SET_CLUBS':
            return {
              ...state,
              clubs: action.payload
            }
        default:
            return state;
    }
}
