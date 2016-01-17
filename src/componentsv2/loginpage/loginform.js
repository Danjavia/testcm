import React, { PropTypes, Component } from 'react'

// import components here

class LoginForm extends Component {

	constructor ( props ) {
		
		super ( props )

		this.state = {
			signup: false
		}

		this.loginurl = 'http://localhost:1337/login'
		this.registerurl = 'http://localhost:1337/register'
	}

	handleSubmit ( e ) {
		e.preventDefault()

		let userInfo = {
			username: this.refs.username.value.trim(),
			password: this.refs.password.value.trim()
		}

		$.ajax({
	      	url: this.loginurl,
	      	method: 'POST',
	      	data: userInfo,
	      	dataType: 'json',
	      	success: (( data ) => {
	      		console.log( data )

	      		if ( data.code ) {
	      			Materialize.toast( data.error, 1500 )
	      			return
	      		}

				this.setState({
					signup: true,
					user: data
				})

				window.location.href = '/#/profile'
	      	})
	    })
	}

	registerUser ( e ) {
		e.preventDefault()

		let userInfo = {
			username: this.refs.username.value.trim(),
			password: this.refs.password.value.trim(),
			avatar: 'https://unsplash.it/200/300?image=' + Math.floor(( Math.random() * 500 ) + 1 ) 
		}

		$.ajax({
	      	url: this.registerurl,
	      	method: 'POST',
	      	data: userInfo,
	      	dataType: 'json',
	      	success: (( data ) => {

	      		console.log( data )

	      		if ( data.code ) {
	      			Materialize.toast( data.error, 1500 )
	      			return
	      		}

				this.setState({
					signup: true,
					user: data
				})

				window.location.href = '/#/billing-info'
	      	})
	    })
	}

	render () {
		return (
			<div id="login-form">
                <div className="row center-align">
                    <form className="col s12 m12 l12" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="row">
                            <h3>User Registration Process</h3>
                        </div>
                        <div className="row">
                            <div className="input-field col s12 m12 l12">
                                <i className="material-icons prefix">account_box</i>
                                <input id="Username" ref="username" type="text" className="validate"/>
                                <label htmlFor="Username" data-error="Check ur Username" data-success="right">Username</label>
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
                                <button className="btn waves-effect waves-light action-button signin" type="submit" name="action" onClick={this.handleSubmit.bind(this)}>Sign in
                                    <i className="material-icons right">lock</i>
                                </button>
                                <button className="btn blue waves-effect waves-light action-button" type="submit" name="action" onClick={this.registerUser.bind(this)}>Sign up
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


export default LoginForm