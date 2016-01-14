'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

// Components
var Navbar = require( './components/navbar' );
var Footer = require( './components/footer' );
var LoginForm = require( './components/loginForm' );

// Home component
var Login = React.createClass({

    getInitialState: function () {
        return {
            refUrl: RootUrl,
            authData: null
        };
    },

    componentWillMount: function () {

        var ref = new Firebase( this.state.refUrl ),
            authData = ref.getAuth();

        if ( authData && localStorage.auth )
            location.href = '/#/favorites'
    },  

    render: function () {
        return (
            <div className="login">
                <Navbar />
                <LoginForm />
                <Footer />
            </div>
        );
    }
});

// Export component
module.exports = Login;