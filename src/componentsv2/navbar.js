import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import cookie from 'react-cookie';

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

		let userData = JSON.parse( localStorage.u )

        // Identify customer
		woopra.identify({
		    email: userData.billing_info.email,
		    name: userData.billing_info.name,
		    username: userData.username,
		    avatar: userData.avatar
		});
         
        // track
        woopra.track( 'Sign out', {
            username: userData.username
        });
    
    	cookie.remove( 'wooTracker' );

		delete localStorage.sid
		delete localStorage.signed
		delete localStorage.u
		delete localStorage.p

		window.location.href = '/'
	}

	cleanOrders ( e ) {
		
		e.preventDefault()

		delete localStorage.saleProduct
		delete localStorage.promo
		delete localStorage.pid
		delete localStorage.p

		window.location.href = '/'
	}

	clean ( e ) {
		
		e.preventDefault()

        // track
        woopra.track( 'Login button' );

		delete localStorage.saleProduct
		delete localStorage.promo
		delete localStorage.pid
		delete localStorage.p

		window.location.href = '/#login'
	}

	render () {
		return (
			<nav className="grey darken-4">
	            <div className="nav-wrapper container">
	                <Link to="/" className="brand-logo" onClick={ this.cleanOrders.bind( this ) }>Woopra</Link>
	                <ul className="right hide-on-med-and-down app-menu">
	                    <li><Link to='/' onClick={ this.cleanOrders.bind( this ) }>Home</Link></li>
	                    { this.state.auth ? <li><Link to='/profile'>Profile</Link></li> : null }
	                    { this.state.auth ? <li><a href="/" onClick={this.logout.bind( this )}>Logout</a></li> : <li><Link to='/login' onClick={ this.clean.bind( this ) }>Login</Link></li> }
	                </ul>
	            </div>
	        </nav>
		);
	}
};

// Export component
export default Navbar;