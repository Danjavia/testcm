import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router';

class ProductSingle extends Component {
	render() {
		return (
			<div className="col s12 m6 l4 product" id={this.props.data.id}>
				<Link className="teal-text darken-4" to={`/product/${this.props.data.id}`}><h3 className="product__name">{this.props.data.name}</h3></Link>
				<Link to={`/product/${this.props.data.id}`}><img src={this.props.data.image} className="product__image hoverable" alt="placeholder+image" /></Link>
				<p className="product__description">
					{this.props.data.description}
				</p>
				<Link to={`/product/${this.props.data.id}`} className="btn waves-effect waves-light teal darken-4 right product__buy">View course</Link>
			</div>
		)
	}
}

export default ProductSingle