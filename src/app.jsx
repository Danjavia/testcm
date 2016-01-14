import React, { PropTypes, Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'

// Include Components
import Navbar from './componentsv2/navbar'
import NFound from './componentsv2/notFound'
import Home from './componentsv2/home'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    )
  }
}

export default class Root extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={Home} />
          <Route path='about' component={NFound} />
          <Route path='contact' component={NFound} />
        </Route>
      </Router>
    );
  }
}

render( <Root/>, document.getElementById('content') )
