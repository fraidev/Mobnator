import React, { useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  makeStyles,
  Grid,
  TextField
} from "@material-ui/core";
import { DndProvider } from "react-dnd";
import Backend from "react-dnd-html5-backend";
import DndPersonCard from "./DndPersonCard";
import update from "immutability-helper";

const style = {
  width: 400
};

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

const MainCard: React.FC = () => {
  const [textField, setTextField] = useState("");
  const [cards, setCards] = useState([
    {
      id: 1,
      text: "Frai"
    }
  ]);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragCard = cards[dragIndex];
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard]
          ]
        })
      );
    },
    [cards]
  );

  const renderCard = (card: { id: number; text: string }, index: number) => {
    return (
      <DndPersonCard
        key={card.id}
        index={index}
        id={card.id}
        text={card.text}
        moveCard={moveCard}
      />
    );
  };

  const classes = useStyles();

  const addPerson = () =>
    setCards([
      ...cards,
      ...[{ id: cards[cards.length - 1].id + 1, text: textField }]
    ]);

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Mobnator
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div className={classes.addPersonWrapper}>
              <TextField
                size="small"
                variant="outlined"
                label="Enter the name here"
                className={classes.textField}
                onChange={e => setTextField(e.target.value)}
              ></TextField>

              <Button
                className={classes.addButton}
                variant="contained"
                color="secondary"
                onClick={addPerson}
              >
                Add Participant
              </Button>
            </div>
          </Grid>
          <Grid item xs={6}>
            <DndProvider backend={Backend}>
              {
                <div style={style}>
                  {cards.map((card, i) => renderCard(card, i))}
                </div>
                // <DndPeople />
              }
            </DndProvider>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button className={classes.button} variant="contained" color="primary">
          Start Mob
        </Button>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles({
  root: {
    minWidth: 875,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    margin: "0px auto 50px",
    maxWidth: "600px",
    width: "90%",
    textAlign: "center"
  },
  content: {
    minHeight: 500
  },
  addPersonWrapper: {
    display: "flex",
    flexWrap: "wrap",
    maxHeight: "37.5px",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  textField: {},
  addButton: {
    marginLeft: "5px",
    height: "39px",
    color: "white",
    fontSize: "15px"
  },
  title: {
    fontSize: 35,
    color: "black"
  },
  pos: {
    marginBottom: 12
  },
  container: {},
  button: {
    alignSelf: "center",
    margin: "0 auto"
  }
});

export default MainCard;
