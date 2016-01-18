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
			<section>
				<section className="profileInfo white-text">
					<div className="container">
						<img src={ this.props.data ? this.props.data.avatar : null } alt="placeholder+image" className="left"/>
						<div className="profileInfo__data">
							<h3>{ this.props.data ? this.props.data.billing_info.name : null }</h3>
							<h5>@{ this.props.data ? this.props.data.username : null }</h5>
							<strong>{ this.props.data ? this.props.data.products.length : null } Courses in library</strong>
							</div>
						<div className="clearfix"></div>
					</div>
				</section>

				<section className="container">
					<h4 className="teal-text darken-4" style={{ marginTop: '50px', marginBottom: '40px' }}>My courses</h4>

			      	<div className="row products">
			            { this.props.data ? this.props.data.products.map( ( product, i ) => (
			              <ProductSingle data={product} key={i}/>
			            )) : null }
			      	</div>
	            </section>
			</section>
        )
	}
}

export default Profile