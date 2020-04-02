import React, { useState, useCallback, useImperativeHandle, forwardRef, Ref } from "react";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import DndPersonCard from "./DndPersonCard";
import update from "immutability-helper";

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
  const [cards, setCards] = useState([
    {
      id: 1,
      text: "Frai",
    },
  ]);

  const setCard = (text: string) => {
    setCards([...cards, ...[{ id: cards[cards.length - 1].id + 1, text: text }]]);
  }

  useImperativeHandle(ref, () => ({
    setCard
  }));


  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex];
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [cards]
  );

  const renderCard = (card: { id: number; text: string }, index: number) => {
    return <DndPersonCard key={card.id} index={index} id={card.id} text={card.text} moveCard={moveCard} started={prop.started} />;
  };
  return <DndProvider backend={Backend}>{
    <div style={style}>
      {cards.map((card, i) => renderCard(card, i))}
    </div>
  }</DndProvider>;
});

export default DndPeople;
