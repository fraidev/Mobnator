import React, { useCallback, useImperativeHandle, forwardRef, Ref, useState } from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import DndPersonCard from "./DndPersonCard";
import update from "immutability-helper";
import LogicService, { Person } from "../services/LogicService";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

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

const DndPeople = forwardRef((prop: { started: boolean }, ref: Ref<DndPeopleRef>) => {
  const [people, setPeople] = useState<Person[]>(LogicService.getPeople());

  const setCard = (name: string) => {
    let p = { id: people.length + 1, name: name };
    setPeople([...people, ...[p]]);
    LogicService.addPerson(p);
  }

  useImperativeHandle(ref, () => ({
    setCard
  }));

  const handleClick = (e: any, data: any) => {
    console.log(data.foo);
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
          <MenuItem data={{ foo: 'bar' }} onClick={handleClick}>
            Navigator
        </MenuItem>
          <MenuItem data={{ foo: 'bar' }} onClick={handleClick}>
            Driver
          </MenuItem>
          <MenuItem divider />
          <MenuItem data={{ foo: 'bar' }} onClick={handleClick}>
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
