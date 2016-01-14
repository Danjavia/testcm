import React, { PropTypes, Component } from 'react'

// Import components here
import Navbar from './componentsv2/navbar'

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    )
  }
}
