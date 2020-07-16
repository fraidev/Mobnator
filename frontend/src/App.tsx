import React from 'react'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'
import MainCard from './components/MainCard'
import StateStoreProvider from './services/StateStore'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

function App() {
  const classes = useStyles()

  return (
    <StateStoreProvider>
      <div className={classes.App}>
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route path="/">
                {<MainCard />}
              </Route>
              <Route path="/:token">
                {<MainCard />}
              </Route>
            </Switch>
          </Router >
        </ThemeProvider>
      </div>
    </StateStoreProvider>
  )
}

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: '#3fb57f'
    }
  }
})

const useStyles = makeStyles({
  App: {
    textAlign: 'center',
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white'
  }
})

export default App
