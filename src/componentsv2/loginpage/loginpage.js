import React, { PropTypes, Component } from 'react'

// Import components here
import Navbar from '../navbar'
import LoginForm from './loginform'
import Footer from '../footer'

class LoginPage extends Component {

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