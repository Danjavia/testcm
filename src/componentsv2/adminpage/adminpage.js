import React, { PropTypes, Component } from 'react'

// Import components here

class AdminPage extends Component {

	componentDidMount () {

		trackJs.track("Tracking error from dashboard");

		try {
		  logical || mean
		} catch (e) {
		  trackJs.track(e);
		}

		// let appID = 'SY60JOBTT1X4F5A6BB0D1U7ZD4DESCEU'
		// let secretKey = 'bhYAr2D60MizKslHvh2kufDpg3JIw3nh1vX4Y9fDmhqWFUAH0hqLY4Ts3vDzhX6N'

		// let obj = {
		//     website: "wooprapp.danjavia.xyz",
		//     date_format: "dd-MM-yyyy",
		//     start_day: 29,
		//     end_day: 0,
		//     limit: 15,
		//     goals: [{
		//         operator: "AND",
		//         name: "Confirmed",
		//         filters: [{
		//             scope: "actions",
		//             value: "pay",
		//             match: "contains",
		//             key: "name"
		//         }]
		//     }],
		 
		//     "order_by": 0,
		//     "segments": [],
		//     "group_by": {
		//         "scope": "visits",
		//         "key": "day"
		//     }
		// };
		 
		// $.ajax({
		//     type: 'GET',
		//     url: 'http://www.woopra.com/rest/2.4/funnels',
		//     crossDomain: true,

		//     beforeSend: function ( xhr ) {
		//         xhr.setRequestHeader( 'Authorization', 'Basic ' + btoa( appID + ':' + secretKey ));
		//     },

		//     data: {
		//         request: JSON.stringify(obj)
		//     },

		//     success: function (text) {

		//         alert(JSON.stringify(text));
		//     }
		// });
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