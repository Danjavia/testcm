import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

// Import components here
import ActionsPanel from '../extras/actionspanel'

class SideProduct extends Component {

	constructor ( props ) {
	
		super ( props )
	
		this.state = {}
	    this.producturl = 'http://localhost:1337/products/'
	}

	findProductById ( id ) {

		$.ajax({
	      	url: this.producturl + id,
	      	method: 'GET',
	      	dataType: 'json',
	      	success: (( data ) => {

				this.setState({
					product: data
				})
	      	})
	    })
	}

	componentDidMount () {
		this.findProductById( this.props.data )
	}

	signInPromo () {

		// Woopra: track sale event funnel

		localStorage.promo = true
		localStorage.pid = this.props.data

		window.location.href = '/#/login'
	}

	simulateSale () {
		// Woopra: track sale event 
		Materialize.toast( 'Congratulations, the file will be to download in a few seconds', 3000 )
	}

	trackShare () {
		// Woopra: track share event
	}

	render() {
		return (
			<aside className="aside">
				<div className="single__actions">
					<h4>Actions</h4>
	      			<article>
	      				<h5><strong style={{ fontWeight: 700 }}>Price: ${ this.state.product ? this.state.product.price : null } USD</strong></h5>
	      				
	      				<a href="/#/login" className="btn waves-effect waves-light green darken-2">Buy course</a>
	      				<p>
	      					Buy and save into my personal library.
	      				</p>

	      				<a href="/assets/images/dweb.jpg" download className="btn waves-effect waves-light green" onClick={this.simulateSale.bind( this )}>Buy & download</a>
	      				<p>
	      					Buy and download directly. (without login or signup) 
	      				</p>

	      				<a href={`http://www.twitter.com/share?url=http://localhost:3000/product/${ this.state.product ? this.state.product.id : null }` } className="btn waves-effect waves-light red" onClick={ this.trackShare.bind( this ) }>Share It!</a>
	      				<p>
	      					Share this course with your better friends. Also with your enemies <i className="material-icons prefix">thumb_up</i>
	      				</p>

	      				<a className="btn waves-effect waves-light blue" onClick={this.signInPromo.bind( this )}>Get offer now</a>
	      				<p>
	      					Register now and get this course only for $10 USD.
	      				</p>
	      				<ActionsPanel />
	      			</article>
				</div>
	      	</aside>
        )
	}
}

export default SideProduct