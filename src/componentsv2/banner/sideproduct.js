import React, { PropTypes, Component } from 'react'

// Import components here

class SideProduct extends Component {

	constructor ( props ) {
	
		super ( props )
	
		this.state = {}
	}

	render() {
		return (
			<aside className="aside">
				<div className="single__actions">
					<h4>Actions</h4>
	      			<article>
	      				<a href="/#/login"><img src="assets/images/android.jpg" alt="placeholder+image" /></a>
	      				<p>Register now and get this course totally free.</p>
	      			</article>
				</div>
	      	</aside>
        )
	}
}

export default SideProduct