import { v4 as uuidV4 } from 'uuid'
import GlobalStateRepository from './LogicService'
import { GlobalState } from '../models/types'
import { initialTimeConfig } from './StateStore'

const StateReducer = (state: GlobalState, action: { type: any; payload: any; }) => {
  const newState = handlers(state, action)
  GlobalStateRepository.saveState(newState)

  return newState
}

const handlers = (state: GlobalState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case 'SYNC':
      const newState = GlobalStateRepository.getState()
      if (newState) {
        state = newState
      }
      return { ...state }
    case 'SET_STARTED':
      state.started = action.payload
      return { ...state }
    case 'ADD_PERSON':
      state.people.push({ id: uuidV4(), name: action.payload, isDriver: false, isNavigator: false })
      if (state.people.length > 1) {
        state.people[1].isNavigator = true
      }
      if (state.people.length > 0) {
        state.people[0].isDriver = true
      }
      sanitizePeople(state)
      return { ...state }
    case 'SET_PEOPLE':
      state.people = action.payload
      sanitizePeople(state)
      return { ...state }
    case 'ROLL_PEOPLE':
      if (state.config.break) {
        state.config.pastRounds = 0
      } else {
        const first = state.people.shift()
        state.people.push(first!)
        sanitizePeople(state)
        state.config.pastRounds++
      }
      state.config.break = (state.config.pastRounds > state.config.roundCount)
      return { ...state }
    case 'SET_CONFIG_ROUND_MINUTES':
      state.config.roundMinutes = parseInt(action.payload)
      return { ...state }
    case 'SET_CONFIG_BREAK_MINUTES':
      state.config.breakMinutes = parseInt(action.payload)
      return { ...state }
    case 'SET_CONFIG_ROUND_COUNT':
      state.config.roundCount = parseInt(action.payload)
      return { ...state }
    case 'SET_CONFIG_TAKE_A_BREAK':
      state.config.break = true
      return { ...state }
    case 'RESET_CONFIG':
      state.config = initialTimeConfig
      state.firstStarted = false
      return { ...state }
    case 'SET_FIRST_STARTED':
      state.firstStarted = action.payload
      return { ...state }
    default:
      return state
  }
}

const sanitizePeople = (state: GlobalState) => {
  state.people.forEach(x => { x.isDriver = false; x.isNavigator = false })
  if (state.people.length > 1) {
    state.people[1].isNavigator = true
  }
  if (state.people.length > 0) {
    state.people[0].isDriver = true
  }
}

export default StateReducer
