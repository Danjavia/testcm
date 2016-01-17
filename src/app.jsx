import React, { PropTypes, Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router'

// Other dependencies
import $ from 'jquery'

// Include Components
import HomePage from './homepage'
import NFound from './componentsv2/notFound'
import Home from './componentsv2/home'
import Products from './componentsv2/products/products'
import ProductSingle from './componentsv2/products/productsingle'
import SinglePage from './componentsv2/singlepage/singlepage'
import LoginPage from './componentsv2/loginpage/loginpage'
import BillingInfoPage from './componentsv2/billing-infopage/billing-infopage'


// Root component
export default class Root extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={HomePage}>
          <IndexRoute component={Products} />
          <Route path='about' component={NFound} />
          <Route path='contact' component={NFound} />
          <Route path='login' component={LoginPage} />
          <Route path='billing-info' component={BillingInfoPage} />
          <Route path="products" component={ProductSingle}>
            <Route path="/product/:productId" component={SinglePage}/>
          </Route>
          <Route path='*' component={NFound} />
        </Route>
      </Router>
    );
  }
}

render( <Root/>, document.getElementById('content') )