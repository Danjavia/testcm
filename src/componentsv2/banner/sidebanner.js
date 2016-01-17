import React, { PropTypes, Component } from 'react'

// Import components here
import Ad from '../ads/ad'

class Sidebanner extends Component {

	render() {
		return (
			<div className="banner white-text">
				<div className="ads">
					<h5>Advertising</h5>
					<Ad image="assets/images/android.jpg"/>
					<Ad image="assets/images/swift .jpg" link="http://localhost:3000/#/product/6"/>
				</div>
	      	</div>
        )
	}
}

export default Sidebanner