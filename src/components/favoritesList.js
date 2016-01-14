'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

// components
var Favorite = require( './favorite' );

// Cards component
var FavoritesList = React.createClass({

    getInitialState: function () {
        return {
            refUrl: RootUrl,
            authData: null
        };
    },

    componentDidMount: function () {

        var ref = new Firebase( this.state.refUrl ),
            authData = ref.getAuth();

        // Set user data into the component
        if ( this.isMounted() ) {
            this.setState({ auth: authData });
        }
    },

    render: function () {

        var favorites = this.props.data.map( function( data, i ) {
            return (
                <Favorite data={data} key={i}/>
            );
        });

        return (
            <div className="container items-area">
                <h1 className="center-align">Imaginarium</h1>
                <h4 className="center-align">My Favorites</h4>
                
                {this.props.data.length > 0 ? <ul className="collection">{favorites}</ul> : <h3 className="center-align">No Cards Here Yet :( <a href="/">Start One</a></h3>}
                
            </div>
        );
    }
});

// Export component
module.exports = FavoritesList;