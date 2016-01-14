'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

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
			<nav className="red darken-4">
	            <div className="nav-wrapper container">
	                <a href="#/" className="brand-logo">Woopra Test</a>
	                <ul className="right hide-on-med-and-down app-menu">
	                    <li><a href="#/">Home</a></li>
	                    <li><a href="#/login">login</a></li>
	                    { this.state.auth ? <li><a href="#/" onClick={this.logout}>Logout</a></li> : null }
	                </ul>
	            </div>
	        </nav>
		);
	}
};

// Export component
export default Navbar;