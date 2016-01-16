import React, { PropTypes, Component } from 'react'

// Import components here
import Navbar from '../navbar'
import BillingForm from './billingform'

class BillinInfoPage extends Component {

	render() {
		return (
			<div>
				<Navbar />
				<BillingForm />
            </div>
        )
	}
}

export default BillinInfoPage