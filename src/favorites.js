'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

// Firebase area
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var RootUrl = 'https://therion.firebaseIO.com/';

// Components
var Navbar = require( './components/navbar' );
var FavoritesList = require( './components/favoritesList' );
var Footer = require( './components/footer' );

// Home component
var Favorites = React.createClass({

    mixins: [ReactFire],

    getInitialState: function () {
        return {
            refUrl: RootUrl,
            items: [],
            authData: null
        };
    },

    componentWillMount: function() {

        var ref = new Firebase( this.state.refUrl ),
            authData = ref.getAuth();

        if ( authData && localStorage.auth ) {

            var userFavs = new Firebase( this.state.refUrl + 'users/' + authData.uid + '/favorites' );
            this.bindAsArray( userFavs, "favs" );    
        }

        else
            location.href = '/#/';
    }, 

    render: function () {
        return (
            <div className="favorites">
                <Navbar />
                <FavoritesList data={this.state.favs} />
                <Footer />
            </div>
        );
    }
});

// Export component
module.exports = Favorites;