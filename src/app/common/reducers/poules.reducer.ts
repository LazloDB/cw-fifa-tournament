import { Action } from '../models/action';
import { player } from '../models/player';

export function poules(state: any, action: Action) {
    switch (action.type) {
        case 'ADD_POULES':
          return {
            ...state,
            poules: [...state.poules, ...action.payload]
          }
        case 'ADD_POULE_MATCH':
          return {
            ...state,
            poules: state.poules.map(
              (poule) => poule.map(
                (v: player) => v.name === action.payload.name ? {...v, points: action.payload.win ? v.points + 3 : v.points, played: v.played + 1, wins: action.payload.win ? v.wins + 1 : v.wins, losses: !action.payload.win ? v.losses + 1 : v.losses, goals: v.goals + action.payload.goals, goals_against: v.goals_against + action.payload.goals_against, goal_difference: v.goals - v.goals_against} : v
              )
            )
          }
        case 'ADD_POULE_DRAW':
          return {
            ...state,
            poules: state.poules.map(
              (poule) => poule.map(
                (v: player) => v.name === action.payload.name ? {...v, points: v.points + 1, played: v.played + 1, draws: v.draws + 1, goals: v.goals + action.payload.goals, goals_against: v.goals_against + action.payload.goals, goal_difference: v.goals - v.goals_against} : v
              )
            )
          }
        default:
            return state;
    }
}
