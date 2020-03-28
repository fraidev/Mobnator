import React from "react";
import Button from "@material-ui/core/Button";
import DndPeople from "./DndPeople";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  makeStyles,
  Grid
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
        <Typography variant="h5" component="h2">
          a
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <h1>aushduashdosahj</h1>
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
    minWidth: 775
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
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
