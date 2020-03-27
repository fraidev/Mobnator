import React from "react";
import Button from "@material-ui/core/Button";
import "./App.css";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  makeStyles
} from "@material-ui/core";

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Word of the Day
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
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary">
            Hello World
          </Button>
        </CardActions>
      </Card>
    </div>
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
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default App;
