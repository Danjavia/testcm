import React, { PropTypes, Component } from 'react'

// Import components here

class AdminPage extends Component {

	componentDidMount () {

		let obj = {
		    website: "ecommerce-site.com",
		    date_format: "dd-MM-yyyy",
		    start_day: 29,
		    end_day: 0,
		    limit: 15,
		    goals: [{
		        operator: "AND",
		        name: "Confirmed",
		        filters: [{
		            scope: "actions",
		            value: "pay",
		            match: "contains",
		            key: "name"
		        }]
		    }],
		 
		    "order_by": 0,
		    "segments": [],
		    "group_by": {
		        "scope": "visits",
		        "key": "day"
		    }
		};
		 
		$.ajax({
		    type: 'GET',
		    url: 'http://www.woopra.com/rest/2.4/funnels',
		    crossDomain: true,

		    beforeSend: function (xhr) {
		        xhr.setRequestHeader('Authorization', 'Basic '+encodeBase64(appID+':'+secretKey));
		    },

		    data: {
		        request: JSON.stringify(obj)
		    },

		    success: function (text) {

		        alert(JSON.stringify(text));
		    }
		});
	}

	render() {
		return (
			<div>
				Welcome to the admin page test
            </div>
        )
	}
}

export default AdminPage