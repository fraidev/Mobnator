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
  roll: () => void;
}

type RightCommandTypes = {
  command: 'navigator' | 'driver' | 'remove';
  index: number;
  person: Person;
  target: any;
}

const DndPeople = forwardRef((prop: { started: boolean }, ref: Ref<DndPeopleRef>) => {
  const [people, setPeople] = useState<Person[]>(LogicService.getPeople());

  const setCard = (name: string) => {
    let p = { id: uuidV4(), name: name, isDriver: false, isNavigator: false };
    setPeople([...people, ...[p]]);
    LogicService.addPerson(p);
  }

  const roll = () => {
    let firstPerson = people.shift();
    people.push(firstPerson!);

    setPeople([...people]);
  };

  useImperativeHandle(ref, () => ({
    setCard,
    roll
  }));

  // useEffect(() => {

  //   setPeople(people);

  //   console.log(people)

  // }, [people])

  const handleClick = (e: any, data: RightCommandTypes) => {
    console.log(data);
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
      const p = people.filter(x => x.id !== data.person.id);
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


      p.forEach(x => {
        x.isDriver = false;
        x.isNavigator = false;
      });


      p[0].isDriver = true;
      p[1].isNavigator = true;

      setPeople(p);
      LogicService.setPeople(p);
    },
    [people]
  );

  const renderCard = (person: Person, index: number) => {
    return (
      <ContextMenuTrigger key={person.id} id={index.toString()} holdToDisplay={1000}>
        {rightClickMenu(person, index)}
        <DndPersonCard index={index} id={person.id}
          person={person} moveCard={moveCard} started={prop.started} />
      </ContextMenuTrigger>
    );
  };

  const rightClickMenu = (person: Person, index: number) => {
    if (!prop.started)
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

  return <DndProvider backend={Backend}>{
    <div style={style}>
      {people.map((person, index) => renderCard(person, index))}
    </div>
  }</DndProvider>;
});

export default DndPeople;
