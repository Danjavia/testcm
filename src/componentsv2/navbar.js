import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

// Home component
class Navbar extends React.Component {

	constructor( props ) {
		
		super ( props )

		this.state = {
			auth: localStorage.signed || false
		}
	}

	logout ( e ) {

		e.preventDefault()

		delete localStorage.sid
		delete localStorage.signed

		window.location.href = '/'
	}

	cleanOrders ( e ) {
		
		e.preventDefault()

		delete localStorage.saleProduct
		delete localStorage.promo
		delete localStorage.pid

		window.location.href = '/'
	}

	render () {
		return (
			<nav className="grey darken-4">
	            <div className="nav-wrapper container">
	                <Link to="/" className="brand-logo" onClick={ this.cleanOrders.bind( this ) }>Woopra</Link>
	                <ul className="right hide-on-med-and-down app-menu">
	                    <li><Link to='/' onClick={ this.cleanOrders.bind( this ) }>Home</Link></li>
	                    { this.state.auth ? <li><Link to='/profile'>Profile</Link></li> : null }
	                    { this.state.auth ? <li><a href="/" onClick={this.logout.bind( this )}>Logout</a></li> : <li><Link to='/login'>Login</Link></li> }
	                </ul>
	            </div>
	        </nav>
		);
	}
};

// Export component
export default Navbar;