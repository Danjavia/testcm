import React, { PropTypes, Component } from 'react'

// Import components here

class BillingForm extends Component {

	constructor ( props ) {
		
		super( props )

		this.state = {
			signup: false
		}

		this.loginurl = 'http://localhost:1337/login'
		this.registerurl = 'http://localhost:1337/register'
        this.attachurl = 'http://localhost:1337/attach'
	}

    componentDidMount () {

        // if user is not in register process
        if ( ! localStorage.loginProcess )
            window.location.href = '/#/login'
    }

	registerUser ( e ) {

		e.preventDefault()

        // continue with registration process
		let userInfo = JSON.parse( localStorage.loginProcess )

        // Add validation for revalidating user and append more info
        userInfo.validate = true
        userInfo.name = this.refs.name.value.trim()
        userInfo.email = this.refs.email.value.trim()
        userInfo.ccn = this.refs.ccn.value.trim()
        userInfo.ccv = this.refs.ccv.value.trim()
        userInfo.ccd = this.refs.ccd.value.trim()

        // Send info to server
		$.ajax({
	      	url: this.registerurl,
	      	method: 'POST',
	      	data: userInfo,
	      	dataType: 'json',
	      	success: (( data ) => {

	      		if ( data.code ) {
	      			Materialize.toast( data.error, 1500 )
	      			return
	      		}

                // Initialize User data
                localStorage.u = JSON.stringify( data )

				this.setState({
					signed: true,
					user: data
				})

                // Delete persited user info
                delete localStorage.loginProcess

                // set user as signed
                localStorage.signed = true
                localStorage.sid = this.state.user.id

                Materialize.toast( 'Welcome to the app. You\'ll be redirect to your profile in a few seconds', 1500 )

                // Identify customer
                woopra.identify({
                    email: data.billing_info.email,
                    name: data.billing_info.name,
                    username: data.username,
                    avatar: data.avatar
                });
                 
                // track
                woopra.track( 'signup', {
                    company: 'Woopra Test',
                    username: data.username,
                    plan: "Free"
                });

                // Redirect to page
                setTimeout( () => {
                    window.location.href = '/#/profile' 
                }, 3000 )
	      	})
	    }).done(( data ) => {

            if ( data.code ) return

            if ( localStorage.saleProduct || localStorage.promo ) {
                let singleProduct = JSON.parse( localStorage.p )
            } 

            if ( localStorage.saleProduct ) {

                // create relation data
                let attachedData = {
                    userId: data.id,
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
                    email: data.billing_info.email,
                    name: data.billing_info.name,
                    username: data.username,
                    avatar: data.avatar
                });
                 
                // track
                woopra.track( 'Payment', {
                    course: singleProduct.name,
                    username: data.username,
                    amount: singleProduct.price
                });


                delete localStorage.saleProduct 
                delete localStorage.pid 
                delete localStorage.p 
            }

            if ( localStorage.promo ) {
                
                // create relation data
                let attachedData = {
                    userId: data.id,
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
                    email: data.billing_info.email,
                    name: data.billing_info.name,
                    username: data.username,
                    avatar: data.avatar
                });
                 
                // track
                woopra.track( 'Promo', {
                    course: singleProduct.name,
                    username: data.username,
                    amount: 10
                });


                delete localStorage.saleProduct 
                delete localStorage.pid 
                delete localStorage.p 
            }

            window.location.href = '/#/profile'
        })
	}

	render() {
		return (
			<div id="billing-form">
                <div className="row center-align">
                    <form className="col s12 m12 l12" onSubmit={this.registerUser.bind(this)}>
                        <div className="row">
                            <h3>Billing Info</h3>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 m12 l12">
                                <i className="material-icons prefix">account_box</i>
                                <input id="name" ref="name" type="text" className="validate" required/>
                                <label htmlFor="name" data-error="Check ur name" data-success="right">Credit card name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 m12 l12">
                                <i className="material-icons prefix">email</i>
                                <input id="email" ref="email" type="email" className="validate" required/>
                                <label htmlFor="email" data-error="Check ur email" data-success="right">Your email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 m12 l12">
                                <i className="material-icons prefix">credit_card</i>
                                <input id="ccn" ref="ccn" type="text" className="validate" pattern="[0-9]{13,16}" maxLength="16" required/>
                                <label htmlFor="ccn" data-error="Number at least to 13 digits" data-success="right">Credit card number</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6 m6 l6">
                                <i className="material-icons prefix">card_membership</i>
                                <input id="ccv" ref="ccv" type="text" className="validate" pattern="[0-9]{3,4}" maxLength="4" required/>
                                <label htmlFor="ccv" data-error="Only numbers" data-success="right">CCV</label>
                            </div>
                            <div className="input-field col s6 m6 l6">
                                <i className="material-icons prefix">date_range</i>
                                <input id="ccd" ref="ccd" type="text" className="validate" pattern="[0-9]{2}-[0-9]{4}" maxLength="7" required/>
                                <label htmlFor="ccd" data-error="Wrong input" data-success="right">Due date (mm-yyyy)</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 m12 l12">
                                <button className="btn blue waves-effect waves-light action-button" type="submit" name="action" onClick={this.registerUser.bind(this)}>Register
                                    <i className="material-icons right">account_circle</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
	}
}

export default BillingForm