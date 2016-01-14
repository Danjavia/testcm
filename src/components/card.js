'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var CardImage = React.createClass({

    clickImg: function() {

        ga( 'send', {
            hitType: 'event',
            eventCategory: 'Card',
            eventAction: 'click',
            eventLabel: 'Upcard'
        });

        try {
            anchorLink = metapod;
        } catch ( e ) {
            trackJs.track( 'Fallo al momento de dar click en una imagen' );
            trackJs.track( e );
        }
    },

    render: function () {
        return (
            <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" onClick={this.clickImg} src={this.props.image}/>
            </div>
        );
    }
});

var CardContent = React.createClass({
    render: function () {
        return (
            <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">{this.props.title}<i className="material-icons right">more_vert</i></span>
                <p><a href={this.props.link}>View more about this</a></p>
            </div>
        );
    }
});

var CardActions = React.createClass({

    getInitialState: function () {
        return {
            refUrl: RootUrl,
            authData: null
        };
    },

    sendSaved: function ( e ) {

        e.preventDefault();

        var ref = new Firebase( this.state.refUrl ),
            authData = ref.getAuth();

        localStorage.fav = this.props.action.item;

        // If the user data doesn't exits open login modal
        if ( ! authData ) {

            if ( document.getElementById( 'loginModal' )  ) {

                $( '#loginModal' ).openModal();

                $( '#login-form' ).addClass( 'into-modal' );

            }

        }

        // If the user is logged exec this
        else {

            // set Favorites
            var favorites;

            // Get user data
            var user = new Firebase( this.state.refUrl + '/users/' + authData.uid );

            // Get user favorites
            user.child( "favorites" ).on( "value", function( snapshot ) {

                if ( snapshot.val() != null ) {

                    favorites = snapshot.val();

                    favorites.push( this.props.action.item );
                }

                else {

                    favorites = [];

                    favorites.push( this.props.action.item );
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

                woopra.track( "Save into favorites", {
                    item: localStorage.fav
                });

                // Display message
                Materialize.toast( 'Saved into favorites.', 4000 );

            }, 300 );

        }

        // console.log( this.props.userData );

        ga( 'send', {
            hitType: 'event',
            eventCategory: 'Button clicks',
            eventAction: 'click',
            eventLabel: 'Saving the ' + this.props.action.item + ' into Favorites'
        });

        trackJs.configure({ userId: authData.password.email });

        try {
            settingsme === true;
        } catch ( e ) {
            trackJs.track( 'Fallo al momento de guardar una imagen en favoritos' );
            trackJs.track( e );
        }
    },

    download: function ( e ) {

        woopra.track( 'Download', {
            downloaded_card: this.props.action.item
        });

        ga( 'send', {
            hitType: 'event',
            eventCategory: 'Button clicks',
            eventAction: 'click',
            eventLabel: 'Download Image' + this.props.action.item
        });

        window.Intercom( 'boot', {
            app_id: "y36fm6q4"
        });
 
        window.Intercom( 'update' );

    },

    render: function () {
        return (
            <div className="card-action">
                <a href="#" className="saveTo" data-id={this.props.action.item} onClick={this.sendSaved}><i className="fa fa-heart"></i> Fav</a>
                <a href={this.props.action.link} download className="right download-button"  data-id={this.props.action.item} onClick={this.download}><i className="fa fa-download"></i> Down</a>
            </div>
        );
    }
});

var CardReveal = React.createClass({

    getInitialState: function () {
        return {
            data: {
                item: this.props.data.item,
                link: this.props.data.link
            }
        };
    },

    closeView: function ( e ) {
        ga( 'send', {
            hitType: 'event',
            eventCategory: 'Button clicks',
            eventAction: 'click',
            eventLabel: 'Closing Image' + this.props.data.item
        });
    },

    render: function () {
        return (
            <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">{this.props.data.title}<i className="material-icons right" onClick={this.closeView}>close</i></span>
                <p>{this.props.data.description}</p>
                <CardActions action={this.state.data}/>
            </div>
        );
    }
});

// Card component
var Card = React.createClass({

    getInitialState: function () {
        return {
            data: {
                item: this.props.data.id,
                title: this.props.data.title,
                description: this.props.data.description,
                link: this.props.data.img
            },
            refUrl: RootUrl
        };
    },

    componentWillMount: function () {

    },

    render: function () {
        return (
            <div className="col x12 m6 l3">
                <div className="card small">
                    <CardImage image={this.props.data.img}/>
                    <CardContent userData={this.props.auth} title={this.props.data.title} link={this.props.data.link} />
                    <CardReveal data={this.state.data}/>
                </div>
            </div>
        );
    }
});

// Export component
module.exports = Card;