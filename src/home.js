'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

// Firebase area
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var RootUrl = 'https://therion.firebaseIO.com/';

// Components
var Navbar = require( './components/navbar' );
var Cards = require( './components/cards' );
var Footer = require( './components/footer' );
var Modal = require( './components/modal' );
var LoginForm = require( './components/loginForm' );

// Home component
var Home = React.createClass({

    mixins: [ReactFire],

	getInitialState: function () {
		return {
			items: [],
			refUrl: RootUrl
		};
	},

	componentWillMount: function() {

	  	var ref = new Firebase( this.state.refUrl + '/items' );
  		this.bindAsArray( ref, "items" );
	},

	componentDidMount: function () {

		// before unload
		$( window ).bind( 'beforeunload', function () {

		    ga( 'send', {
	            hitType: 'event',
	            eventCategory: 'Window Events',
	            eventAction: 'close',
	            eventLabel: 'Site Closed'
	        });

		});
	},

	render: function () {

		return (
			<div className="home">
				<Navbar/>
				<Cards data={this.state.items} />
				<Footer />
				<Modal />
			</div>
		);
	}
});

// Export component
module.exports = Home;