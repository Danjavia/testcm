import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'

// Import components here
import ActionsPanel from '../extras/actionspanel'

class SideProduct extends Component {

	constructor ( props ) {
	
		super ( props )
	
		this.state = {}
	    this.producturl = 'http://localhost:1337/products/'
	    this.attachurl = 'http://localhost:1337/attach'
	}

	findProductById ( id ) {

		$.ajax({
	      	url: this.producturl + id,
	      	method: 'GET',
	      	dataType: 'json',
	      	success: (( data ) => {

	      		localStorage.p = JSON.stringify( data )

				this.setState({
					product: data
				})
	      	})
	    })
	}

	componentDidMount () {
		this.findProductById( this.props.data )
	}

	signInPromo ( e ) {

		e.preventDefault()

		// Woopra: track sale event funnel

        let singleProduct = JSON.parse( localStorage.p )

        // track
        woopra.track( 'Get course via promo', {
            course: singleProduct.name
        });
        
		localStorage.promo = true
		localStorage.pid = this.props.data

		window.location.href = '/#/login'
	}

	simulateSale ( e ) {
		// Woopra: track sale event 

		let singleProduct = JSON.parse( localStorage.p )
		
		if ( localStorage.signed ) {

			let userData = JSON.parse( localStorage.u )

	        // Identify customer
			woopra.identify({
			    email: userData.billing_info.email,
			    name: userData.billing_info.name,
			    username: userData.username,
			    avatar: userData.avatar
			});
	         
	        // track
	        woopra.track( 'Direct payment', {
	            course: singleProduct.name,
	            username: userData.username,
	            amount: singleProduct.price
	        });
	         
	        // track
	        woopra.track( 'Download', {
	            course: singleProduct.name,
	            username: userData.username
	        });
		}
  
        // track
        woopra.track( 'Guest direct payment', {
            course: singleProduct.name,
	        amount: singleProduct.price
        });

        woopra.track( 'Download', {
            course: singleProduct.name
        });

		Materialize.toast( 'Congratulations, the file will be to download in a few seconds', 3000 )
	}

	trackShare () {
		// Woopra: track share event

		let singleProduct = JSON.parse( localStorage.p )

		if ( localStorage.signed ) {
			
			let userData = JSON.parse( localStorage.u )

	        // Identify customer
			woopra.identify({
			    email: userData.billing_info.email,
			    name: userData.billing_info.name,
			    username: userData.username,
			    avatar: userData.avatar
			});
	         
	        // track
	        woopra.track( 'Shared on twitter', {
	            course: singleProduct.name,
	            username: userData.username
	        });
		}
  
        // track
        woopra.track( 'Guest has shared on twitter', {
            course: singleProduct.name
        });

	}

	saleProduct ( e ) {

		e.preventDefault()
		// Save state for the order

		localStorage.saleProduct = true
		localStorage.pid = this.props.data
			
		let singleProduct = JSON.parse( localStorage.p )

		if ( localStorage.signed ) {

			let userData = JSON.parse( localStorage.u )

    		// create relation data
    		let attachedData = {
    			userId: localStorage.sid,
    			productId: localStorage.pid
    		}

	    	$.ajax({
	    		url: this.attachurl,
	    		method: 'POST',
	    		dataType: 'json',
	    		data: attachedData,
	    		success: (( data ) => {
	    			Materialize.toast( data.data, 1500 )
	    		})
	    	})

	        // Identify customer
			woopra.identify({
			    email: userData.billing_info.email,
			    name: userData.billing_info.name,
			    username: userData.username,
			    avatar: userData.avatar
			});
	         
	        // track
	        woopra.track( 'Payment via buy course signed', {
	            course: singleProduct.name,
	            username: userData.username
	        });

    		delete localStorage.saleProduct 
    		delete localStorage.pid 

			setTimeout( () => {
				window.location.href = '/#/profile'
			}, 2000 )

			return
		}
	         
        // track
        woopra.track( 'Payment via buy course not signed', {
            course: singleProduct.name
        });

		window.location.href = '/#/login'
	}

	render() {
		return (
			<aside className="aside">
				<div className="single__actions">
					<h4>Actions</h4>
	      			<article>
	      				<h5><strong style={{ fontWeight: 700 }}>Price: ${ this.state.product ? this.state.product.price : null } USD</strong></h5>
	      				
	      				<a className="btn waves-effect waves-light green darken-2" onClick={ this.saleProduct.bind( this ) }>Buy course</a>
	      				<p>
	      					Buy and save into my personal library.
	      				</p>

	      				<a href="/assets/images/dweb.jpg" download className="btn waves-effect waves-light green" onClick={ this.simulateSale.bind( this ) }>Buy & download</a>
	      				<p>
	      					Buy and download directly. (without login or signup) 
	      				</p>

	      				<a href={`http://www.twitter.com/share?url=http://localhost:3000/product/${ this.state.product ? this.state.product.id : null }` } className="btn waves-effect waves-light red" onClick={ this.trackShare.bind( this ) }>Share It!</a>
	      				<p>
	      					Share this course with your better friends. Also with your enemies <i className="material-icons prefix">thumb_up</i>
	      				</p>
	      				{ ! localStorage.signed ?
	      				<div><a className="btn waves-effect waves-light blue" onClick={this.signInPromo.bind( this )}>Get offer now</a>
	      				<p>
	      					Register now and get this course only for $10 USD.
	      				</p></div> : null }
	      			</article>
				</div>
	      	</aside>
        )
	}
}

export default SideProduct