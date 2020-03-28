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
import AddBoxOutlinedIcon from "@material-ui/icons/AddSharp";

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
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Enter the name here"
            ></TextField>

            <Button
              className={classes.addButton}
              variant="contained"
              color="secondary"
            >
              Add Participant
            </Button>
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
  addBoxIcon: {
    paddingTop: "20px",
    fontSize: "30px",
    color: "primary"
  },
  addButton: {
    // marginTop: "2px",
    marginLeft: "5px",
    height: "54px"
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
