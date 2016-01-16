import React, { PropTypes, Component } from 'react'

// Import components here
import Navbar from '../navbar'
import LoginForm from './loginform'

class LoginPage extends Component {

	render() {
		return (
			<div>
				<Navbar />
            	<LoginForm />
            </div>
        )
	}
}

export default LoginPage