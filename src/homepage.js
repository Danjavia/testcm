import React, { PropTypes, Component } from 'react'

export default class HomePage extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
