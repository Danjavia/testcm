'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var FavoriteImage = React.createClass({

    render: function () {
        return (
            <img src={this.props.image} alt="" width="400" className="circle materialboxed"/>
        );
    }
});

var FavoriteTitle = React.createClass({
    render: function () {
        return (
            <span className="title">{this.props.title}</span>
        );
    }
});

var FavoriteContent = React.createClass({
    render: function () {
        return (
            <p>
                {this.props.content}
            </p>
        );
    }
});

// Favorite component
var Favorite = React.createClass({

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

        var ref = new Firebase( this.state.refUrl + 'items/' + ( this.props.data[ '.value' ] - parseInt( 1 ) ) );

        // Retrieve new posts as they are added to our database
        ref.once( "value", function( data ) {
            this.setState({
                img: data.val().img,
                title: data.val().title,
                description: data.val().description
            })
        }.bind(this));

        $( '.materialboxed' ).materialbox();
    },

    render: function () {
        return (
            <li className="collection-item avatar">
                <FavoriteImage image={this.state.img} />
                <FavoriteTitle title={this.state.title} />
                <FavoriteContent content={this.state.description} />
            </li>
        );
    }
});

// Export component
module.exports = Favorite;