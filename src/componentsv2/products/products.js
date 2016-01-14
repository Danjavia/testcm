import React, { PropTypes, Component } from 'react'

// Include Components
import Product from '../product/product'

class Products extends Component {
	render() {
		return (
			<div>
				Here goes the products list
				<Product/>
			</div>
		)
	}
}

export default Products