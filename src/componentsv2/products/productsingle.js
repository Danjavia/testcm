import React, { PropTypes, Component } from 'react'

// Include Components
import Navbar from '../navbar'

class Products extends Component {

	render () {

	    return (
	    	<div>
			    <Navbar />
		        {this.props.children}
	    	</div>
	    );
	}
}

export default Products