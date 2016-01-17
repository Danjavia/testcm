import React, { PropTypes, Component } from 'react'

// Include Components
import Navbar from '../navbar'
import Footer from '../footer'

class Products extends Component {

	render () {

	    return (
	    	<div>
			    <Navbar />
		        {this.props.children}
			    <Footer />
	    	</div>
	    );
	}
}

export default Products