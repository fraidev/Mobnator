import { v4 as uuidV4 } from 'uuid'
import GlobalStateRepository from './LogicService'
import { GlobalState } from '../models/types'
import { initialTimeConfig } from './StateStore'
import openSocket from 'socket.io-client'
import axios from 'axios'

export const socket = openSocket('http://localhost:5004')

const StateReducer = (state: GlobalState, action: { type: any; payload: any; }) => {
  if (action.type === 'SYNC') {
    if (action.payload) {
      state = action.payload
      console.log(action.payload)
    } else {
      const chace = GlobalStateRepository.getState()
      if (chace) {
        state = chace
      }
    }
    return { ...state }
  }

  if (action.type === 'ROLL_PEOPLE') {
    state.config.breakDate = Date.now()
    state.config.roundDate = Date.now()
    state.mode = 'waiting'
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
  }

  const newState = actionHandlers(state, action)

  const pathname = window.location.pathname
  if (pathname === '/') {
    GlobalStateRepository.saveState(newState)
  } else {
    socket.emit('UPDATE_STATE', { token: pathname.substring(1), state: newState })
  }

  return newState
}

const actionHandlers = (state: GlobalState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case 'SHARE':
      state = GlobalStateRepository.getState()!

      axios.post('http://localhost:5002/api/share', state)
        .then(res => {
          // socket.emit('send:message', res.data)
          window.location.pathname = '/' + res.data
        })
      return { ...state }
    case 'SET_RUNNING_MODE':
      state.mode = 'running'
      return { ...state }
    case 'SET_PAUSED_MODE':
      state.mode = 'paused'
      return { ...state }
    case 'SET_WAITING_MODE':
      state.mode = 'waiting'
      return { ...state }
    case 'SET_FIRST_STARTED':
      state.firstStarted = action.payload
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
    case 'SET_CONFIG_DATES':
      state.config.roundDate = action.payload.roundDate
      state.config.breakDate = action.payload.breakDate
      return { ...state }
    case 'RESET_CONFIG':
      state.config = initialTimeConfig
      state.firstStarted = false
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
