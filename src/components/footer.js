'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

// Home component
var Footer = React.createClass({

	getInitialState: function () {
		return {};
	},

	render: function () {
		return (
			<footer className="center-align">
	            <p>&copy; 2016 Comparamejor.com</p>
	        </footer>
		);
	}
});

// Export component
module.exports = Footer;