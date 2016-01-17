import React, { PropTypes, Component } from 'react'

// Import components here
import Navbar from '../navbar'
import Profile from '../profilepage/profile'
import Footer from '../footer'

class ProfilePage extends Component {

	constructor ( props ) {
	
		super ( props )
	
		this.state = {}
		this.userDataurl = 'http://localhost:1337/user/'
	}

	componentWillMount () {

        // if user is not logged
        if ( ! localStorage.signed )
            window.location.href = '/#/login'
	}

	componentDidMount () {
		setInterval(() => {
			$.ajax({
				url: this.userDataurl + localStorage.sid,
				method: 'GET',
				dataType: 'json',
				success: (( data ) => {
					if ( this.isMounted() ) {
						this.setState({
							user: data
						})
					}
				})
			})
		}, 2000 )
	}

	render() {

		return (
			<div>
				<Navbar />
				<Profile data={ this.state.user ? this.state.user : null } />
				<Footer />
            </div>
        )
	}
}

export default ProfilePage