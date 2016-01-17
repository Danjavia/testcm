import React, { PropTypes, Component } from 'react'

// Import components here

class Ad extends Component {

	constructor ( props ) {
	
		super ( props )
	
		this.state = {}
	}

	render() {
		return (
  			<article>
  				<a href={ this.props.link ? this.props.link : '/#/login' }><img src={this.props.image} alt="placeholder+image" /></a>
  				<p>{ this.props.text ? this.props.text : 'Register now and get this course totally free.' }</p>
  			</article>
        )
	}
}

export default Ad