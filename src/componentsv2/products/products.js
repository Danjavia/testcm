import React, { PropTypes, Component } from 'react'

// Include Components
import Navbar from '../navbar'
import Product from '../product/product'
import Sidebanner from '../banner/sidebanner'

class Products extends Component {

	constructor ( props ) {
		
		super ( props )

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
			    <h4 className="container center-align" style={{ marginTop: '50px', marginBottom: '40px' }}>Check all our products</h4>
			    <div className="flex container">
			      	<div className="row products">
			    		{ products.length > 0 ? products : <h3>No products here</h3> }
			      	</div>
			      	<Sidebanner />
			    </div>
	    	</div>
	    );
	}
}

export default Products