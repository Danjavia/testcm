import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

// Home component
class Footer extends React.Component {

	constructor( props ) {

		super ( props )
	}

	render () {
		return (
			<nav className="grey darken-4">
	            <div className="nav-wrapper container">
	                <Link to="/" className="brand-logo">Woopra</Link>
	                <strong className="right">&copy; 2016. Test for manage Woopra tool.</strong>
	            </div>
	        </nav>
		);
	}
};

// Export component
export default Footer;