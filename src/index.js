import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'carbon-components/css/carbon-components.min.css';
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'
import GlobalStyles from 'globalStyles'
import theme from 'theme'
import configureStore, { history } from 'store'
import * as serviceWorker from 'serviceWorker'
import { Button } from 'carbon-components-react';

const store = configureStore(/* provide initial state if any */)

const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {/* place ConnectedRouter under Provider */}
        <GlobalStyles />
        {/* this is a good place to have fixed footers/heasders */}
        <Switch>
          {/* Renders the first child <Route> or <Redirect> that matches the location. */}
          <Route exact path="/" render={() => <div> <Button>Button</Button></div>} />
          <Route render={() => <div>Miss</div>} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </ThemeProvider>
)

const root = document.getElementById('root')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
