import React from "react";
import { makeStyles } from "@material-ui/core";
import MainCard from "./components/MainCard";

function App() {
  const classes = useStyles();

  return <div className={classes.App}>{<MainCard />}</div>;
}

const useStyles = makeStyles({
  App: {
    textAlign: "center",
    backgroundColor: "#282c34",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "white"
  }
});

export default App;
