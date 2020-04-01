import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import { Card, CardContent, Typography, CardActions, makeStyles, Grid, TextField } from "@material-ui/core";
import CasinoOutlinedIcon from "@material-ui/icons/CasinoOutlined";
import GroupIcon from "@material-ui/icons/Group";
import Timer, { TimeRef } from "./Timer";
import DndPeople, { DndPeopleRef } from "./DndPeople";

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

const MainCard: React.FC = () => {
  const [textField, setTextField] = useState("");
  const dndPeopleRef = useRef<DndPeopleRef>(null);
  const timerRef = useRef<TimeRef>(null);


  const classes = useStyles();

  const addPerson = () => {
    dndPeopleRef?.current?.setCard(textField);
  };

  const startMob = () => {
    timerRef?.current?.startTimer();
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextField(e.target?.value)}
              ></TextField>

              <Button className={classes.addButton} variant="contained" color="secondary" onClick={addPerson}>
                Add Participant
              </Button>
            </div>
            <div className={classes.parameters}>
              <Grid className={classes.parametersGrid} item xs={12}>
                <span className={classes.parametersLabel}>Duração da rodada em minutos:</span>
                <TextField
                  className={classes.parametersItems}
                  size="small"
                  variant="outlined"
                  defaultValue="10"
                  type="number"
                ></TextField>
              </Grid>
              <Grid className={classes.parametersGrid} item xs={12}>
                <span className={classes.parametersLabel}>Duração do intervalo em minutos:</span>
                <TextField
                  className={classes.parametersItems}
                  size="small"
                  variant="outlined"
                  defaultValue="5"
                  type="number"
                ></TextField>
              </Grid>
              <Grid className={classes.parametersGrid} item xs={12}>
                <span className={classes.parametersLabel}>Intervalo inicia após (quantidade de rodadas):</span>
                <TextField
                  className={classes.parametersItems}
                  size="small"
                  variant="outlined"
                  defaultValue="6"
                  type="number"
                ></TextField>
              </Grid>
              <Grid className={classes.parametersGrid} item xs={12}>
                <CasinoOutlinedIcon className={classes.dice}></CasinoOutlinedIcon>
                <GroupIcon></GroupIcon>
                <Timer ref={timerRef}></Timer>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={6}>
            <DndPeople ref={dndPeopleRef} />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button className={classes.button} variant="contained" color="primary" onClick={startMob}>
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
    textAlign: "center",
  },
  content: {
    minHeight: 500,
  },
  addPersonWrapper: {
    display: "flex",
    flexWrap: "wrap",
    maxHeight: "37.5px",
    width: "100%",
    alignItems: "left",
    justifyContent: "left",
    paddingBottom: "50px",
  },
  parameters: {
    display: "flex",
    flexWrap: "wrap",
    maxHeight: "37.5px",
    width: "100%",
    alignItems: "right",
    justifyContent: "right",
    fontSize: "16px",
    fontWeight: "bold",
    color: "rgb(88, 88, 88)",
    paddingBottom: "10px",
  },
  parametersGrid: {
    display: "flex",
    alignItems: "center",
    justifyContent: "right",
    width: "65px",
    maxHeight: "37.5px",
    marginBottom: "20px",
  },
  parametersLabel: {
    flex: 1,
    paddingBottom: "15px",
    textAlign: "left",
  },
  parametersItems: {
    display: "flex",
    width: "65px",
    maxHeight: "37.5px",
    paddingBottom: "10px",
    paddingLeft: "10px",
  },
  textField: {
    flex: 1,
  },
  addButton: {
    marginLeft: "5px",
    height: "39px",
    color: "white",
    fontSize: "15px",
  },
  title: {
    fontSize: 35,
    color: "black",
  },
  pos: {
    marginBottom: 12,
  },
  container: {},
  button: {
    alignSelf: "center",
    margin: "0 auto",
  },
  dice: {
    transform: "rotate(30deg)",
    fontSize: "50px",
  },
});

export default MainCard;
