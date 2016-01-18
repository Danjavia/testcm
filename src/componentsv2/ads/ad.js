import React, { PropTypes, Component } from 'react'

// Import components here

class Ad extends Component {

	constructor ( props ) {
	
		super ( props )
	
		this.state = {}
	}

	trackPromo ( e ) {

		e.preventDefault()

        // track
        woopra.track( 'Banner Promocional', {
        	promo: this.props.banner
        })

        window.location.href = ( this.props.link ? this.props.link : '/#/login' ) 

	}

	render() {
		return (
  			<article>
  				<a href={ this.props.link ? this.props.link : '/#/login' } onClick={ this.trackPromo.bind( this ) }><img src={this.props.image} alt="placeholder+image" /></a>
  				<p>{ this.props.text ? this.props.text : 'Register now and get awesome offers.' }</p>
  			</article>
        )
	}
}

export default Ad