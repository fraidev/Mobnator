import React, { createContext, useReducer, Dispatch, ReactNode } from 'react'
import StateReducer from './StateReducer'
import { GlobalState, ConfigParameters } from '../models/types'

export const initialTimeConfig: ConfigParameters = {
  breakDate: Date.now(),
  roundDate: Date.now(),
  roundMinutes: 10,
  breakMinutes: 5,
  roundCount: 6,
  pastRounds: 0,
  break: false
}

const initialState: GlobalState = {
  mode: 'paused',
  firstStarted: false,
  people: [],
  config: initialTimeConfig
}

export const StateContext = createContext<{
  state: GlobalState;
  dispatch: Dispatch<{
    type: any;
    payload: any;
  }>;
}>({
  state: initialState,
  dispatch: () => null
})

type Props = {
  children: ReactNode
}

export const StateStoreProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(StateReducer, initialState)
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}

export default StateStoreProvider
