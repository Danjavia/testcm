'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

// components
var LoginForm = require( './loginForm' );

// Home component
var Modal = React.createClass({

    getInitialState: function () {
        return {

        };
    },

    render: function () {
        return (
            <div className="modal-box">
                <div id="loginModal" className="modal">
                    <div className="modal-content">
                        <LoginForm />
                    </div>
                </div>
            </div>
        );
    }
});

// Export component
module.exports = Modal;