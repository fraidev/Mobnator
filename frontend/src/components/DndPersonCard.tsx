import React, { useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { XYCoord } from "dnd-core";
import ItemTypes from "./item-types";
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import MapIcon from '@material-ui/icons/Map';
import { Person } from "../models/types";


export interface CardProps {
  id: any;
  person: Person;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  started: boolean;
}

type DragItem = {
  index: number;
  id: string;
  type: string;
}

const DndPersonCard: React.FC<CardProps> = ({ id, person, index, moveCard, started }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current!.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    canDrag(monitor: any) {
      return !started;
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));
  return (
    <div ref={ref} style={{ ...style, opacity }}>
      {person.isDriver ? <DriveEtaIcon /> : ""}
      {person.isNavigator ? <MapIcon /> : ""}
      {person.name}
    </div>
  );
};

export default DndPersonCard;

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move"
};
