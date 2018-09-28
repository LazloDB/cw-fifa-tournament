import { Action } from '../models/action';
import { player } from '../models/player';

export function poules(state: any, action: Action) {
    switch (action.type) {
        case 'ADD_POULES':
            return {
              ...state,
              poules: [...state.poules, ...action.payload]
            }
        case 'ADD_POULE_WIN':
            return {
              ...state,
              poules: state.poules.map(
                (poule) => poule.map(
                  (v: player) => v.name === action.payload.name ? {...v, points: v.points + 3, played: v.played + 1, wins: v.wins + 1, goals: v.goals + action.payload.goals, goals_against: v.goals_against + action.payload.goals_against, goal_difference: v.goals - v.goals_against} : v
                )
              )
            }
        case 'ADD_POULE_LOSS':
            return {
              ...state,
              poules: state.poules.map(
                (poule) => poule.map(
                  (v: player) => v.name === action.payload.name ? {...v, played: v.played + 1, losses: v.losses + 1, goals: v.goals + action.payload.goals, goals_against: v.goals_against + action.payload.goals_against, goal_difference: v.goals - v.goals_against} : v
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
