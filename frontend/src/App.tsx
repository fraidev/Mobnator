import React from "react";
import { makeStyles, createMuiTheme, ThemeProvider } from "@material-ui/core";
import MainCard from "./components/MainCard";
import { teal, blue } from "@material-ui/core/colors";

function App() {
  const classes = useStyles();

  return (
    <div className={classes.App}>
      <ThemeProvider theme={theme}>{<MainCard />}</ThemeProvider>
    </div>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: teal
  }
});

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
