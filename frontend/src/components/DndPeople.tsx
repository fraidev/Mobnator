import React, { useCallback, useImperativeHandle, forwardRef, Ref, useState } from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import DndPersonCard from "./DndPersonCard";
import update from "immutability-helper";
import LogicService, { Person } from "../services/LogicService";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { v4 as uuidV4 } from 'uuid';

const style = {
  width: 400
};

export type Item = {
  id: number;
  text: string;
}

export type DndPeopleRef = {
  setCard: (text: string) => void;
}

type RightCommandTypes = {
  command: 'navigator' | 'driver' | 'remove';
  target: any;
}

const DndPeople = forwardRef((prop: { started: boolean }, ref: Ref<DndPeopleRef>) => {
  const [people, setPeople] = useState<Person[]>(LogicService.getPeople());

  const setCard = (name: string) => {
    let p = { id: uuidV4(), name: name };
    setPeople([...people, ...[p]]);
    LogicService.addPerson(p);
  }

  useImperativeHandle(ref, () => ({
    setCard
  }));

  const handleClick = (e: any, data: RightCommandTypes) => {
    if (data.command === 'navigator') {

    }
    if (data.command === 'driver') {

    }
    if (data.command === 'remove') {
      console.log(data.target.innerText)
      const p = people.filter(x => x.name !== data.target.innerText);
      setPeople(p);
      LogicService.setPeople(p);
    }
  }

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = people[dragIndex];
      let p = update(people, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      });
      setPeople(p);
      LogicService.setPeople(p);
    },
    [people]
  );

  const renderCard = (person: Person, index: number) => {
    return (<ContextMenuTrigger key={person.id} id="same_unique_identifier" holdToDisplay={1000}>
      <DndPersonCard index={index} id={person.id}
        text={person.name} moveCard={moveCard} started={prop.started} />
    </ContextMenuTrigger>
    );
  };

  const rightClickMenu = () => {
    if (!prop.started)
      return (
        <ContextMenu id="same_unique_identifier">
          <MenuItem data={{ command: 'navigator' }} onClick={handleClick}>
            Navigator
          </MenuItem>
          <MenuItem data={{ command: 'driver' }} onClick={handleClick}>
            Driver
          </MenuItem>
          <MenuItem divider />
          <MenuItem data={{ command: 'remove' }} onClick={handleClick}>
            Remove
          </MenuItem>
        </ContextMenu>)
  }

  return <DndProvider backend={Backend}>{
    <div style={style}>
      {rightClickMenu()}

      {people.map((person, i) => renderCard(person, i))}
    </div>
  }</DndProvider>;
});

export default DndPeople;
