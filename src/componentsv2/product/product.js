import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router';

class Product extends Component {

	constructor ( props ) {
		super ( props )

		this.state = {}
	} 

	trackTitle ( e ) {

		e.preventDefault()

		let singleProduct = this.props.data

		if ( localStorage.signed ) {

			let userData = JSON.parse( localStorage.u )

			// Identify customer
			woopra.identify({
			    email: userData.billing_info.email,
			    name: userData.billing_info.name,
			    username: userData.username,
			    avatar: userData.avatar
			});
	        
	        // track
	        woopra.track( 'By title', {
	            course: singleProduct.name,
	            username: userData.username
	        });

	        window.location.href = `/#/product/${this.props.data.id}`
		}
         
        // track
        woopra.track( 'By title', {
            course: singleProduct.name
        });

        window.location.href = `/#/product/${this.props.data.id}`
	}

	trackImage ( e ) {

		e.preventDefault()

		let singleProduct = this.props.data

		if ( localStorage.signed ) {

			let userData = JSON.parse( localStorage.u )

			// Identify customer
			woopra.identify({
			    email: userData.billing_info.email,
			    name: userData.billing_info.name,
			    username: userData.username,
			    avatar: userData.avatar
			});
	        
	        // track
	        woopra.track( 'By image', {
	            course: singleProduct.name,
	            username: userData.username
	        });

	        window.location.href = `/#/product/${this.props.data.id}`
		}
         
        // track
        woopra.track( 'By image', {
            course: singleProduct.name
        });

        window.location.href = `/#/product/${this.props.data.id}`
	}

	trackButton ( e ) {

		e.preventDefault()

		let singleProduct = this.props.data

		if ( localStorage.signed ) {

			let userData = JSON.parse( localStorage.u )

			// Identify customer
			woopra.identify({
			    email: userData.billing_info.email,
			    name: userData.billing_info.name,
			    username: userData.username,
			    avatar: userData.avatar
			});
	        
	        // track
	        woopra.track( 'By button', {
	            course: singleProduct.name,
	            username: userData.username
	        });

	        window.location.href = `/#/product/${this.props.data.id}`
		}
         
        // track
        woopra.track( 'By button', {
            course: singleProduct.name
        });

        window.location.href = `/#/product/${this.props.data.id}`
	}

	render() {
		return (
			<div className="col s12 m6 l4 product" id={this.props.data.id}>
				<Link onClick={ this.trackTitle.bind( this ) } className="teal-text darken-4" to={`/product/${this.props.data.id}`}><h3 className="product__name">{this.props.data.name}</h3></Link>
				<Link onClick={ this.trackImage.bind( this ) } to={`/product/${this.props.data.id}`}><img src={this.props.data.image} className="product__image hoverable" alt="placeholder+image" /></Link>
				<p className="product__description">
					{this.props.data.description}
				</p>
				<strong className="teal-text darken-4">Price: $<a className="product__price right-align teal-text darken-4">{this.props.data.price}</a> USD</strong>
				<Link onClick={ this.trackButton.bind( this ) } to={`/product/${this.props.data.id}`} className="btn waves-effect waves-light teal darken-4 right product__buy">View course</Link>
			</div>
		)
	}
}

export default Product