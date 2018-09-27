import { Action } from '../models/action';

export function poules(state: any, action: Action) {
    switch (action.type) {
        case 'ADD_POULES':
            return {
              ...state,
              poules: [...state.poules, ...action.payload]
            }
        case 'ADD_POULE_DATA':
            console.log(state);
            return {

            }
        default:
            return state;
    }
}
