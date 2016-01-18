import React, { PropTypes, Component } from 'react'

// Import components here
import Navbar from '../navbar'
import LoginForm from './loginform'
import Footer from '../footer'

class LoginPage extends Component {

	componentDidMount () {

        // track
        woopra.track( 'login page loaded' );
	}

	render() {
		return (
			<div>
				<Navbar />
            	<LoginForm />
            	<Footer />
            </div>
        )
	}
}

export default LoginPage