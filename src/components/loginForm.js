'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var OAUTH = 'WbekgyPe55xRsg6GeQwnSM4J4rYk2WXVn80uXDw2';

// Home component
var LoginForm = React.createClass({

    getInitialState: function () {
        return {
            refUrl: RootUrl 
        };
    },

    handleSubmit: function ( e ) {

        e.preventDefault();

        var ref = new Firebase( this.state.refUrl );

        ref.authWithPassword({

            email    : this.refs.email.value.trim(),
            password : this.refs.password.value.trim()
        
        }, function( error, authData ) {

            if ( error ) {

                Materialize.toast( 'Login Failed!', 4000 );

                // The identify code should be added before the "track()" function
                woopra.track( "Failure login", {
                    email: this.refs.email.value.trim()
                });
        
            } else {

                localStorage.auth = true;

                // Woopra track identifier
                woopra.identify({
                    email: authData.password.email,
                    name: authData.password.email,
                    avatar: authData.password.profileImageURL,
                    company: authData.password.company
                });

                window.trackJs.configure({ userId: authData.password.email });

                try {
                    a === true;
                } catch ( e ) {

                    trackJs.track( e );
                }

                // The identify code should be added before the "track()" function
                woopra.track( "Access to app", {
                    user: authData.password.email
                });

                // intercom code
                window.Intercom( 'boot', {
                    app_id: "y36fm6q4",
                    email: authData.password.email, // TODO: The current logged in user's email address.
                });

                window.Intercom( 'update' );

                // if exist login modal
                if ( document.getElementById( 'loginModal' )  ) {
                
                    $( '#loginModal' ).closeModal();

                    globalState.callback( true );

                    // console.log( this.state.refUrl + '/users/' + authData.uid ); return;

                    // set Favorites
                    var favorites;

                    // Get user data
                    var user = new Firebase( this.state.refUrl + '/users/' + authData.uid );

                    // Get user favorites
                    user.child( "favorites" ).on( "value", function( snapshot ) {

                        if ( snapshot.val() != null ) {

                            favorites = snapshot.val();

                            favorites.push( parseInt( localStorage.fav ) );
                        }

                        else {

                            favorites = [];

                            favorites.push( parseInt( localStorage.fav ) );
                        }                 

                    }.bind( this ));

                    // set simple timeout to prevent async data
                    setTimeout( function () {

                        // Unique array
                        favorites = $.grep( favorites, function( v, k ) {
                            return $.inArray( v ,favorites ) === k;
                        });

                        // Save the array into firebase
                        ref.child( "users" ).child( authData.uid ).set({
                            favorites: favorites,
                        });

                        // Display message
                        Materialize.toast( 'Saved into favorites.', 4000 );

                    }, 300 );

                    return;

                }

                location.href = '/#/favorites';

            }
        }.bind( this ));

    },

    registerUser: function ( e ) {

        e.preventDefault();

        var ref = new Firebase( this.state.refUrl );
        var avatar = 'http://lorempixel.com/320/320/people/' + Math.floor( ( Math.random() * 20 ) + 1 );

        ref.createUser({

            email    : this.refs.email.value.trim(),
            password : this.refs.password.value.trim(),
            avatar: avatar,
            company: 'elestore'

        }, function( error, userData ) {

            if ( error ) {

                console.log( 'Error creating user:', error );
                Materialize.toast( error, 4000 );

            } else {

                $( '#loginModal' ).closeModal();

                localStorage.auth = true;

                globalState.callback( true );

                Materialize.toast( 'Welcome to Imaginarium.', 4000 );

                // Woopra track identifier
                woopra.identify({
                    userId: userData.uid,
                    avatar: avatar,
                    company: 'elestore'
                });

                trackJs.configure({
                    userId: userData.uid, 
                    sessionId: userData.uid
                });

                // The identify code should be added before the "track()" function
                woopra.track( "Access to app", {
                    userId: userData.uid
                });

                if ( document.getElementById( 'loginModal' )  ) {

                    // set Favorites
                    var favorites;

                    // Get user data
                    var user = new Firebase( this.state.refUrl + '/users/' + userData.uid );

                    // Get user favorites
                    user.child( "favorites" ).on( "value", function( snapshot ) {

                        if ( snapshot.val() != null ) {

                            favorites = snapshot.val();

                            favorites.push( parseInt( localStorage.fav ) );
                        }

                        else {

                            favorites = [];

                            favorites.push( parseInt( localStorage.fav ) );
                        }                 

                    }.bind( this ));

                    // set simple timeout to prevent async data
                    setTimeout( function () {

                        // Unique array
                        favorites = $.grep( favorites, function( v, k ) {
                            return $.inArray( v ,favorites ) === k;
                        });

                        // Save the array into firebase
                        ref.child( "users" ).child( userData.uid ).set({
                            favorites: favorites,
                        });

                        $( '.signin' ).trigger( 'click' );

                    }, 300 );
                }
            }
        }.bind( this ));

    },

    render: function () {
        return (
            <div className="col x12 m6 l3" id="login-form">
                <div className="row center-align">
                    <form className="col s12 m12 l12" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <h3>Sign In</h3>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 m12 l12">
                                <i className="material-icons prefix">account_box</i>
                                <input id="email" ref="email" type="email" className="validate"/>
                                <label htmlFor="email" data-error="Check ur email" data-success="right">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 m12 l12">
                                <i className="material-icons prefix">lock</i>
                                <input id="password" ref="password" type="password" className="validate"/>
                                <label htmlFor="password" data-error="wrong" data-success="right">Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 m12 l12">
                                <button className="btn waves-effect waves-light action-button signin" type="submit" name="action" onClick={this.handleSubmit}>Sign in
                                    <i className="material-icons right">lock</i>
                                </button>
                                <button className="btn blue waves-effect waves-light action-button" type="submit" name="action" onClick={this.registerUser}>Sign up
                                    <i className="material-icons right">account_circle</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
                
        );
    }
});

// Export component
module.exports = LoginForm;