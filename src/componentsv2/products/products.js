import React, { PropTypes, Component } from 'react'

// Include Components
import Navbar from '../navbar'
import Product from '../product/product'

class Products extends Component {

	constructor ( props ) {
		
		super( props )

		this.state = {
			products: []
		}

		this.fetchurl = 'http://localhost:1337/products'
	}

	fetchProducts () {

		$.ajax({
	      	url: this.fetchurl,
	      	method: 'GET',
	      	dataType: 'json',
	      	success: (( data ) => {
	      		console.log( data )

				this.setState({
					products: data
				})
	      	})
	    })
	}

	componentDidMount () {
		this.fetchProducts()
	}

	render () {

		let products = this.state.products.map( function( result, i ) {
	      	return (
	      	  	<Product data={result} key={i}/>
	      	)
	    })

	    return (
	    	<div>
			    <Navbar />
			    <div className="flex container">
			      	<div className="row container products">
			    		{ products.length > 0 ? products : <h3>No products here</h3> }
			      	</div>
			      	<div className="banner">
			      		<h2>Here goes a banner sample</h2>
			      	</div>
			    </div>
	    	</div>
	    );
	}
}

export default Products