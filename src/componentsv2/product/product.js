import React, { PropTypes, Component } from 'react'

class Product extends Component {
	render() {
		return (
			<div className="col s12 m6 l4 product" id={this.props.data.id}>
				<h3 className="product__name">{this.props.data.name}</h3>
				<img src="http://dummyimage.com/800x600/4d494d/686a82.gif&text=placeholder+image" className="product__image" alt="placeholder+image" />
				<p className="product__description left-align">
					{this.props.data.description}
				</p>
				<a className="product__price right-align">{this.props.data.price}</a>
			</div>
		)
	}
}

export default Product