import React, { useCallback, useContext } from 'react'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import DndPersonCard from './DndPersonCard'
import update from 'immutability-helper'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import { Person } from '../models/types'
import { StateContext } from '../services/StateStore'

const style = {
  width: 400
}

export type Item = {
  id: number;
  text: string;
}

export type DndPeopleRef = {
  roll: () => void;
}

type RightCommandTypes = {
  command: 'navigator' | 'driver' | 'remove';
  index: number;
  person: Person;
  target: any;
}

const DndPeople: React.FC = () => {
  const { state, dispatch } = useContext(StateContext)

  const handleClick = (e: any, data: RightCommandTypes) => {
    console.log(data)
    // if (data.command === 'navigator') {
    //   people[data.index].isNavigator = true;
    //   let p = [...people];
    //   setPeople(p);
    //   LogicService.setPeople(p);
    // }
    // if (data.command === 'driver') {
    //   people[data.index].isDriver = true;
    //   let p = [...people];
    //   setPeople(p);
    //   LogicService.setPeople(p);
    // }
    if (data.command === 'remove') {
      console.log(data.target.innerText)
      const p = state.people.filter(x => x.id !== data.person.id)
      dispatch({ type: 'SET_PEOPLE', payload: p })
    }
  }

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = state.people[dragIndex]
      const p = update(state.people, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      })

      p.forEach(x => {
        x.isDriver = false
        x.isNavigator = false
      })

      p[0].isDriver = true
      p[1].isNavigator = true

      dispatch({ type: 'SET_PEOPLE', payload: p })
    },
    [state.people, dispatch]
  )

  const renderCard = (person: Person, index: number) => {
    return (
      <ContextMenuTrigger key={person.id} id={index.toString()} holdToDisplay={1000}>
        {rightClickMenu(person, index)}
        <DndPersonCard index={index} id={person.id}
          person={person} moveCard={moveCard} started={state.mode !== 'paused'} />
      </ContextMenuTrigger>
    )
  }

  const rightClickMenu = (person: Person, index: number) => {
    if (state.mode !== 'paused') {
      return (
        <ContextMenu id={index.toString()}>
          {/* <MenuItem data={{ command: 'navigator', person: person, index: index }} onClick={handleClick}>
            Navigator
          </MenuItem>
          <MenuItem data={{ command: 'driver', person: person, index: index }} onClick={handleClick}>
            Driver
          </MenuItem> */}
          {/* <MenuItem divider /> */}
          <MenuItem data={{ command: 'remove', person: person, index: index }} onClick={handleClick}>
            Remove
          </MenuItem>
        </ContextMenu>)
    }
  }

  return <DndProvider backend={Backend}>{
    <div style={style}>
      {state.people.map((person, index) => renderCard(person, index))}
    </div>}</DndProvider>
}

export default DndPeople
