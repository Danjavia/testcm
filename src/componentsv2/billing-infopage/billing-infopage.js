import React, { PropTypes, Component } from 'react'

// Import components here
import Navbar from '../navbar'
import BillingForm from './billingform'
import Footer from '../footer'

class BillinInfoPage extends Component {

	componentDidMount () {
                 
        // track
        woopra.track( '/billing-info' );
	}

	render() {
		return (
			<div>
				<Navbar />
				<BillingForm />
				<Footer />
            </div>
        )
	}
}

export default BillinInfoPage