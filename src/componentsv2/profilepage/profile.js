import React, { PropTypes, Component } from 'react'

// Import components here
import ProductSingle from '../product/productsingle'

class Profile extends Component {

	constructor ( props ) {
	
		super ( props )
	
		this.state = {}
	}

	render() {

		return (
			<div className="container">
				<h2>User data</h2>
				<h3>{ this.props.data ? this.props.data.billing_info.name : null }</h3>
				<h5>{ this.props.data ? this.props.data.username : null }</h5>
				<img src={ this.props.data ? this.props.data.avatar : null } alt="placeholder+image" />
				<strong>{ this.props.data ? this.props.data.products.length : null } Courses in library</strong>

				<h4 className="teal-text darken-4" style={{ marginTop: '50px', marginBottom: '40px' }}>My courses</h4>

		      	<div className="row products">
		            { this.props.data ? this.props.data.products.map( ( product, i ) => (
		              <ProductSingle data={product} key={i}/>
		            )) : null }
		      	</div>
            </div>
        )
	}
}

export default Profile