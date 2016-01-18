import React, { PropTypes, Component } from 'react'

// Import components here
import Navbar from '../navbar'
import SideProduct from '../banner/sideproduct'

class SinglePage extends Component {

	constructor ( props ) {

		super( props )

		this.state = {}
	    this.producturl = 'http://localhost:1337/products/'
	    this.listedProduct = ''
	}

	findProductById ( id ) {

		$.ajax({
	      	url: this.producturl + id,
	      	method: 'GET',
	      	dataType: 'json',
	      	success: (( data ) => {

	      		this.listedProduct = data.name

				this.setState({
					product: data
				})
	      	})
	    })
	}

	componentDidMount () {

		this.findProductById( this.props.params.productId )

        // track
        woopra.track( '/product', {
        	productId: this.props.params.productId
        });
	}

	render() {

		return (
			<div className="flex container">
				<div className="container single">
					<h1 className="single__name">{ this.state.product ? this.state.product.name : null }</h1>
					<img src={this.state.product ? this.state.product.image : null} alt="placeholder+image" className="single__image" />
					<h3>Description</h3>
					<p>
						{ this.state.product ? this.state.product.description : null }
					</p>
	            </div>
			    <SideProduct data={ this.props.params.productId } />
			</div>
        )
	}
}

export default SinglePage