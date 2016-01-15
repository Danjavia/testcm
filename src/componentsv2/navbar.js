'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

// Home component
class Navbar extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			auth: false
		}
	}

	render () {
		return (
			<nav className="grey darken-4">
	            <div className="nav-wrapper container">
	                <Link to="/" className="brand-logo">Demo Page</Link>
	                <ul className="right hide-on-med-and-down app-menu">
	                    <li><Link to='/'>Home</Link></li>
	                    <li><Link to='/login'>login</Link></li>
	                    { this.state.auth ? <li><a href="#/" onClick={this.logout}>Logout</a></li> : null }
	                </ul>
	            </div>
	        </nav>
		);
	}
};

// Export component
export default Navbar;