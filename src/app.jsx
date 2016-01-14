import React, { PropTypes, Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'

// Include Components
import HomePage from './homepage'
import NFound from './componentsv2/notFound'
import Home from './componentsv2/home'


// Root component
export default class Root extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={HomePage}>
          <IndexRoute component={Home} />
          <Route path='about' component={NFound} />
          <Route path='contact' component={NFound} />
          <Route path='*' component={NFound} />
        </Route>
      </Router>
    );
  }
}

render( <Root/>, document.getElementById('content') )