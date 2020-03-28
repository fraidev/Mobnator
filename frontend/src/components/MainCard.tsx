import React from "react";
import Button from "@material-ui/core/Button";
import DndPeople from "./DndPeople";
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

function MainCard() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Mobster
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div className={classes.addPersonWrapper}>
              <TextField
                size="small"
                variant="outlined"
                label="Enter the name here"
                className={classes.textField}
              ></TextField>

              <Button
                className={classes.addButton}
                variant="contained"
                color="secondary"
              >
                Add Participant
              </Button>
            </div>
          </Grid>
          <Grid item xs={6}>
            <DndProvider backend={Backend}>{<DndPeople />}</DndProvider>
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
}

const useStyles = makeStyles({
  root: {
    minWidth: 875,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    margin: "0px auto 50px",
    maxWidth: "600px",
    width: "90%",
    textAlign: "center"
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
